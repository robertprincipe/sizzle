import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels import auth

from apps.blog.serializers import ReactionSerializer
from .models import Post, Reaction
from channels.db import database_sync_to_async
from django.db import IntegrityError
from django.db.models import Count

class ReactionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
	    
        self.post_id = self.scope["url_route"]["kwargs"]["post_id"]
        self.room_group_name = f"post_{self.post_id}_reactions"

            # Join the room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Leave the room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    # Receive message from WebSocket
    async def receive(self, text_data):
        # get reactions message type
        data = json.loads(text_data)
        message_type = data.get('type', None)
        if message_type == "reaction_list":
            print("hoala kamakms reaction_list")
            reactions = await self.get_reactions()
            await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "reaction_list",
                        "reactions": reactions,
                    }
                )
        elif self.user.is_authenticated and message_type == "react_post":
                await self.save_reaction(data.get("emoji"))
                reactions = await self.get_reactions()
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "react_post",
                        "reactions": reactions,
                    }
                )
        

    @database_sync_to_async
    def save_reaction(self, emoji):
        try:
            post = Post.objects.get(id=self.post_id)
        except Post.DoesNotExist:
            pass
        try:
            reaction = Reaction.objects.get(post=post, user=self.user)
            if reaction.emoji == emoji:
                reaction.delete()
                return reaction
            else:
                reaction.emoji=emoji
                reaction.save()
                return reaction
        except Reaction.DoesNotExist:
            new_reaction = Reaction.objects.create(emoji=emoji, user=self.user, post=post)
            print("reaction ssaev new_reaction", new_reaction)
            return new_reaction
            
    # Receive message from room group
    async def react_post(self, event):
        # Send message to WebSocket
        reactions = event.get("reactions", None)
        await self.send(
            text_data=json.dumps(
                {
                    "type": "reaction_list",
                    "reactions": reactions ,
                }
            )
        )

    async def reaction_list(self, event):
        # Send message to WebSocket
        reactions = event.get("reactions", None)
        
        await self.send(
            text_data=json.dumps(
                {
                    "type": "reaction_list",
                    "reactions": reactions ,
                }
            )
        )

    @database_sync_to_async
    def get_reactions(self):
        # Get all reactions for the post
        reactions = Reaction.objects.filter(post_id=self.post_id)
        counted_reactions = reactions.values("emoji").annotate(count=Count("emoji"))
        total_count = reactions.count()
        top_reactions = sorted(counted_reactions, key=lambda x: x["count"], reverse=True)

        response_data = {
            "reactions": [
                {"emoji": item["emoji"], "count": item["count"]} for item in top_reactions
            ],
            "count": total_count,
        }

        return response_data