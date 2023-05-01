from rest_framework import serializers
from .models import Post, Tag, Comment, Reaction
from apps.user.serializers import UserSerializer

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)
    author = serializers.SerializerMethodField()
    tags = TagSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = '__all__'
    

    def get_comment_count(self, obj):
        return obj.comments.count()
    
    def get_author(self, obj):
        serializer = UserSerializer(obj.user)
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