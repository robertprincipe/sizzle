from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import ROLES
from apps.blog.models import Tag, Post

User = get_user_model()


class TinyTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name", "color"]


class RelatedPostSerializer(serializers.ModelSerializer):
    tags = TinyTagSerializer(many=True)

    class Meta:
        model = Post
        fields = ["id", "title", "slug", "cover_image", "tags"]


class UserSerializer(UserCreateSerializer):
    posts = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            "id",
            "email",
            "username",
            "role",
            "picture",
            "banner",
            "posts",
            "profile_info",
        )

    def get_role(self, obj):
        return dict(ROLES).get(int(obj.role))

    def get_posts(self, obj):
        related_posts = obj.posts.all()
        if related_posts.exists():
            serializer = RelatedPostSerializer(related_posts, many=True)
            return serializer.data
        return None
