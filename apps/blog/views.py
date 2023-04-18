from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tag, Post
from .serializers import PostSerializer, TagSerializer

import json

@api_view(['POST'])
def create_post(request):
    post_serializer = PostSerializer(data=request.data)
    
    if post_serializer.is_valid():
        post = post_serializer.save()

        tags = request.data.get('tags', None)

        if tags is not None:
            try:
                tags_json = json.loads(tags)
                for tag_data in tags_json:
                    tag_serializer = TagSerializer(data=tag_data)
                    if tag_serializer.is_valid():
                        tag, _ = Tag.objects.get_or_create(name=tag_serializer.validated_data['name'])
                        post.tags.add(tag)

            except json.JSONDecodeError:
                return Response({"message": "Los tags no estan bien formados"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(post_serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def all_post(request):
    posts = Post.objects.all()

    posts = PostSerializer(posts, many=True)

    return Response(posts.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def post_detail(request, slug):
    posts = Post.objects.get(slug__iexact=slug)

    posts = PostSerializer(posts)

    return Response(posts.data, status=status.HTTP_200_OK)

# @api_view(['POST'])
# def create_post(request):
#     serializer = PostSerializer(data=request.data)
#     if serializer.is_valid():
#         # Obtener los datos de la request
#         title = request.data.get('title')
#         content = request.data.get('content')
#         tags_input = request.data.getlist('tags')
#         cover_image = request.FILES.get('cover_image')
        
#         # Crear los tags y relacionarlos con la publicación
#         tags = []
#         for tag_dict in tags_input:
#             tag = Tag.objects.get_or_create(name=tag_dict.get('name'))
#             tags.append(tag)
        
#         # Crear la publicación y guardarla en la base de datos
#         post = Post.objects.create(title=title, content=content)
#         post.tags.set(tags)
#         post.save()
        
#         # Devolver la respuesta con la publicación creada
#         post = PostSerializer(post)
#         return Response(post.data, status=status.HTTP_201_CREATED)
    
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


"""
def create_post(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""