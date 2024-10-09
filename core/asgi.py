import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

django_asgi_application = get_asgi_application()

from django_channels_jwt_auth_middleware.auth import JWTAuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from .middleware import SafeJWTAuthMiddleware


from django.urls import re_path

from apps.blog.consumers import ReactionConsumer

SafeJWTAuthMiddlewareStack = lambda inner: SafeJWTAuthMiddleware(AuthMiddlewareStack(inner))

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AllowedHostsOriginValidator(
            SafeJWTAuthMiddlewareStack(
                URLRouter(
                    [re_path(r'^ws/react-post/(?P<post_id>[^/]+)/$', ReactionConsumer.as_asgi())],  # Wrap your route in a list
                )
            )
        ),
        # "websocket_timeout": 60,  # This is not a valid option for ProtocolTypeRouter
    }
)

