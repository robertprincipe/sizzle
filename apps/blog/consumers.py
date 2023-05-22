import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Reaction


class ReactionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.post_id = self.scope["url_route"]["kwargs"]["post_id"]
        self.room_group_name = f"post_{self.post_id}_reactions"

        # Join the room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Leave the room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        emoji = data["emoji"]

        # Save the reaction to the database
        reaction = Reaction.objects.create(
            user=self.scope["user"], post_id=self.post_id, emoji=emoji
        )

        # Send reaction to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "reaction_message",
                "emoji": emoji,
                "user_id": reaction.user.id,
            },
        )

    # ...continued:

    # Receive message from room group
    async def reaction_message(self, event):
        emoji = event["emoji"]
        user_id = event["user_id"]

        # Send message to WebSocket
        await self.send(
            text_data=json.dumps(
                {
                    "emoji": emoji,
                    "user_id": user_id,
                }
            )
        )
