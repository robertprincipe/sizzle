import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

django_asgi_application = get_asgi_application()

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

from django.urls import path

from apps.blog.consumers import ReactionConsumer

application = ProtocolTypeRouter(
    {
        "http": django_asgi_application,
        "websocket": AuthMiddlewareStack(
            URLRouter(
                path("ws/react-post/<str:post_id>/", ReactionConsumer.as_asgi()),
            )
        ),
        "websocket_timeout": 60,  # Increase this value as needed
    }
)
