from rest_framework import serializers
from .models import Post, Tag, Comment, Reaction
from apps.user.models import User


class TinyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "picture",
        )


class TinyTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name", "color"]


class RelatedPostSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["id", "title", "slug", "cover_image", "tags"]

    def get_tags(self, obj):
        related_posts = obj.tags.all()
        if related_posts.exists():
            serializer = TinyTagSerializer(related_posts, many=True)
            return serializer.data


class TagSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField()

    class Meta:
        model = Tag
        fields = ["id", "name", "color", "image", "description", "posts"]

    def get_posts(self, obj):
        related_posts = obj.posts_tags.all()
        if related_posts.exists():
            serializer = RelatedPostSerializer(related_posts, many=True)
            return serializer.data
        return None


class TagAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name", "color", "image", "description"]


class PostSerializer(serializers.ModelSerializer):
    # user = TinyUserSerializer(read_only=True)
    author = serializers.SerializerMethodField()
    tags = TinyTagSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()
    reaction_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = "__all__"

    def get_comment_count(self, obj):
        return obj.comments.count()

    def get_reaction_count(self, obj):
        return obj.reactions.count()

    def get_author(self, obj):
        serializer = TinyUserSerializer(obj.user)
        return serializer.data

    # def update(self, instance, validated_data):
    #     cover_image = validated_data.get('cover_image')
    #     print("cover_image", cover_image)
    #     if cover_image == 'null':
    #         # Si se envía explicitamente `null` o no se envía nada, no se realiza ninguna acción
    #         instance.cover_image.delete()
    #         # instance.cover_image = None
    #     else:
    #         # Si se envía un archivo, reemplaza la imagen existente con el archivo enviado
    #         instance.cover_image = cover_image
    #         instance.save()
    #     return super().update(instance, validated_data)


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["id", "parent_id", "user", "content", "replies"]

    def get_replies(self, obj):
        replies = obj.replies.all()
        serializer = self.__class__(replies, many=True)
        return serializer.data

    def get_user(self, obj):
        serializer = TinyUserSerializer(obj.user)
        return serializer.data


class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = "__all__"

    # def create(self, validated_data):
    #     return Reaction.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     instance.user = validated_data.get('user', instance.user)
    #     instance.post = validated_data.get('post', instance.post)
    #     instance.emoji = validated_data.get('emoji', instance.emoji)

    #     instance.save()
    #     return instance
