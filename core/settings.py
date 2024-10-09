import os
from datetime import timedelta
from pathlib import Path
import environ

env = environ.Env()
environ.Env.read_env()

from django.templatetags.static import static
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _

ENVIRONMENT = env

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("SECRET_KEY")

DEBUG = os.environ.get("DEBUG")

ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS").split(",")

BASE_APPS = [
    "unfold",  # before django.contrib.admin
    "unfold.contrib.filters",  # optional, if special filters are needed
    "unfold.contrib.forms",  # optional, if special form elements are needed
    "unfold.contrib.import_export",  # optional, if django-import-export package is used
    "django.contrib.admin",  # required
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "daphne",
    "django.contrib.staticfiles",
]

THIRD_PARTY_APPS = [
    "channels",
    "corsheaders",
    "rest_framework",
    "djoser",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "django_editorjs",
    "colorfield",
]

SAAS_APPS = [
    "apps.user",
    "apps.blog",
]

INSTALLED_APPS = BASE_APPS + THIRD_PARTY_APPS + SAAS_APPS

UNFOLD = {
    "SITE_TITLE": "Sizzle",
    "SITE_HEADER": "Sizzle",
    "SITE_URL": "/",
    "SITE_ICON": lambda request: static("android-chrome-192x192-dba14c5c.png"),
    "SITE_SYMBOL": "speed",  # symbol from icon set
    # "DASHBOARD_CALLBACK": "sample_app.dashboard_callback",
    "LOGIN": {
        "image": lambda r: static("android-chrome-192x192-dba14c5c.png"),
        "redirect_after": lambda r: reverse_lazy("admin:login"),
    },
    "COLORS": {
        "primary": {
            "50": "220 237 255",
            "100": "199 227 255",
            "200": "158 207 255",
            "300": "118 187 255",
            "400": "77 166 255",
            "500": "36 146 255",
            "600": "0 90 179",
            "700": "0 62 123",
            "800": "0 33 67",
            "900": "0 19 39",
        },
    },
    "EXTENSIONS": {
        "modeltranslation": {
            "flags": {
                "en": "🇬🇧",
                "fr": "🇫🇷",
                "nl": "🇧🇪",
            },
        },
    },
    "SIDEBAR": {
        "show_search": True,  # Search in applications and models names
        "show_all_applications": True,  # Dropdown with all applications and models
        "navigation": [
            {
                "title": _("Navigation"),
                "separator": True,  # Top border
                "items": [
                    {
                        "title": _("Dashboard"),
                        "icon": "dashboard",  # Supported icon set: https://fonts.google.com/icons
                        "link": reverse_lazy("admin:index"),
                    },
                    {
                        "title": _("Usuarios"),
                        "icon": "person",
                        "link": reverse_lazy("admin:user_user_changelist"),
                    },
                    {
                        "title": _("Publicaciones"),
                        "icon": "description",
                        "link": reverse_lazy("admin:blog_post_changelist"),
                    },
                    {
                        "title": _("Etiquetas"),
                        "icon": "sell",
                        "link": reverse_lazy("admin:blog_tag_changelist"),
                    },
                ],
            },
        ],
    },
    # "TABS": [
    #     {
    #         "models": [
    #             "blog.comment",
    #         ],
    #         "items": [
    #             {
    #                 "title": _("Comentarios"),
    #                 "link": reverse_lazy("admin:blog_comment_changelist"),
    #             },
    #         ],
    #     },
    # ],
}

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(
                BASE_DIR, "dist"
            ),  # hacemos referencia a nuestra aplicacion de reactjs
            # os.path.join(BASE_DIR, "templates"),
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"
ASGI_APPLICATION = 'core.asgi.application'

CHANNEL_LAYERS = {
    'default':{
        'BACKEND':'channels.layers.InMemoryChannelLayer'
    }
}

DATABASES = {
    "default": env.db("DATABASE_URL", default="postgres:///ninerogues"),
}

DATABASES["default"]["ATOMIC_REQUESTS"] = True

CORS_ORIGIN_WHITELIST = os.environ.get("CORS_ORIGIN_WHITELIST").split(",")
CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = os.environ.get("CSRF_TRUSTED_ORIGINS").split(",")

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "es"

TIME_ZONE = "America/Lima"

USE_I18N = True

USE_TZ = True

STATIC_ROOT = os.path.join(BASE_DIR, "static")  # carpeta de salida
STATIC_URL = "assets/"

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "media/"

STATICFILES_DIRS = [os.path.join(BASE_DIR, "dist/assets")]

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly"
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 12,
}

AUTHENTICATION_BACKENDS = ("django.contrib.auth.backends.ModelBackend",)

SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": ("Bearer",),
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=10080),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "ROTATE_REFRESFH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
}

DJOSER = {
    "LOGIN_FIELD": "username",
    "USER_CREATE_PASSWORD_RETYPE": True,
    "USERNAME_CHANGED_EMAIL_CONFIRMATION": True,
    "PASSWORD_CHANGED_EMAIL_CONFIRMATION": True,
    "SEND_CONFIRMATION_EMAIL": True,
    "SET_USERNAME_RETYPE": True,
    "PASSWORD_RESET_CONFIRM_URL": "password/reset/confirm/{uid}/{token}",
    "SET_PASSWORD_RETYPE": True,
    "PASSWORD_RESET_CONFIRM_RETYPE": True,
    "USERNAME_RESET_CONFIRM_URL": "email/reset/confirm/{uid}/{token}",
    "ACTIVATION_URL": "activate/{uid}/{token}",
    "SEND_ACTIVATION_EMAIL": True,
    "SERIALIZERS": {
        "user_create": "apps.user.serializers.UserSerializer",
        "user": "apps.user.serializers.UserSerializer",
        "current_user": "apps.user.serializers.UserSerializer",
        "user_delete": "djoser.serializers.UserDeleteSerializer",
    },
}

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
AUTH_USER_MODEL = "user.User"

if not DEBUG:
    DEFAULT_FROM_EMAIL = "Compradia tu tienda de confianza <contacto@compradia.shop>"
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    EMAIL_HOST = env("EMAIL_HOST")
    EMAIL_HOST_USER = env("EMAIL_HOST_USER")
    EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
    EMAIL_PORT = env("EMAIL_PORT")
    EMAIL_USE_TLS = env("EMAIL_USE_TLS")

IMAGEKIT_PRIVATE_KEY = os.environ.get("IMAGEKIT_PRIVATE_KEY")
IMAGEKIT_PUBLIC_KEY = os.environ.get("IMAGEKIT_PUBLIC_KEY")
IMAGEKIT_URL_ENDPOINT = os.environ.get("IMAGEKIT_URL_ENDPOINT")

DEFAULT_FILE_STORAGE = "apps.blog.storage.ImageKitStorage"
