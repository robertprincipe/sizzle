from asgiref.sync import sync_to_async
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import UntypedToken
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import UntypedToken
from urllib.parse import parse_qs

User = get_user_model()

async def get_user(token):
    untyped_token = UntypedToken(token)  # This will validate the token and raise an error if it is invalid
    user_id = untyped_token.payload['user_id']
    user = await sync_to_async(User.objects.get)(id=user_id)
    return user

class SafeJWTAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        query_string = scope['query_string'].decode()
        token = parse_qs(query_string).get('token')
        if token:
            try:
                UntypedToken(token[0])
            except (InvalidToken, TokenError):
                scope['user'] = AnonymousUser()
            else:
                scope['user'] = await get_user(token[0])
        else:
            scope['user'] = AnonymousUser()
        return await self.inner(scope, receive, send)