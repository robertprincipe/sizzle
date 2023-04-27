from rest_framework import serializers
from .models import Post, Tag, Comment, Reaction
from apps.user.serializers import UserSerializer
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = '__all__'
    
    def get_comment_count(self, obj):
        return obj.comments.count()

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = ['id', "parent_id", 'user', 'content', 'replies']

    def get_replies(self, obj):
        replies = obj.replies.all()
        serializer = self.__class__(replies, many=True)
        return serializer.data
    
    def get_user(self, obj):
        serializer = UserSerializer(obj.user)
        return serializer.data

class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Reaction
        fields = '__all__'

    # def create(self, validated_data):
    #     return Reaction.objects.create(**validated_data)
    
    # def update(self, instance, validated_data):
    #     instance.user = validated_data.get('user', instance.user)
    #     instance.post = validated_data.get('post', instance.post)
    #     instance.emoji = validated_data.get('emoji', instance.emoji)
    
    #     instance.save()
    #     return instance