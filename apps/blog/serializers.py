from rest_framework import serializers
from .models import Post, Tag, Comment, Reaction

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields = '__all__'

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