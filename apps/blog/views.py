from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tag, Post
from .serializers import PostSerializer, TagSerializer

import json

def get_tags(tags):
    tags_added = []
    error = None
    if tags is not None:
        try:
            tags_json = json.loads(tags)
            for tag_data in tags_json:
                tag_serializer = TagSerializer(data=tag_data)
                if tag_serializer.is_valid():
                    tag, _ = Tag.objects.get_or_create(name=tag_serializer.validated_data['name'])
                    tags_added.append(tag)
        except json.JSONDecodeError:
            error = {"message": "Los tags no estan bien formados"}
    return tags_added, error

@api_view(['POST'])
def create_post(request):
    post_serializer = PostSerializer(data=request.data)
    
    if post_serializer.is_valid():
        post = post_serializer.save()

        tags, error = get_tags(tags=request.data.get('tags', None))
        if error:
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        post.tags.set(tags)
        
        return Response(post_serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_post(request, id):
    try:
        post = Post.objects.get(id=id)
    except Post.DoesNotExist:
        return Response({"message": "No existe una publicación con este id"}, status=status.HTTP_404_NOT_FOUND)

    post_serializer = PostSerializer(post, data=request.data)
    
    if post_serializer.is_valid():
        post = post_serializer.save()

        tags, error = get_tags(tags=request.data.get('tags', None))
        if error:
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        post.tags.set(tags)

        return Response(post_serializer.data, status=status.HTTP_200_OK)
    
    return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_post(request, id):
    try:
        post = Post.objects.get(id=id)
    except Post.DoesNotExist:
        return Response({"message": "No existe una publicación con este id"}, status=status.HTTP_404_NOT_FOUND)

    post.delete()
    
    return Response({"message": "La publicación fue eliminada con exito."}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def all_post(request):
    posts = Post.objects.all()

    posts = PostSerializer(posts, many=True)

    return Response(posts.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def post_detail(request, slug):
    try:
        post = PostSerializer(Post.objects.get(slug__iexact=slug))
        return Response(post.data, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response({"message": "La publicación no existe."}, status=status.HTTP_404_NOT_FOUND)

    
