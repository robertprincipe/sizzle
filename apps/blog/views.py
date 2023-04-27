from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Tag, Post, Comment, Reaction
from .serializers import PostSerializer, TagSerializer, ReactionSerializer, CommentSerializer

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
@permission_classes([IsAuthenticated])
def create_post(request):
    post_serializer = PostSerializer(data=request.data)
    
    if post_serializer.is_valid():
        post = post_serializer.save(user=request.user)

        tags, error = get_tags(tags=request.data.get('tags', None))
        if error:
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        post.tags.set(tags)
        
        return Response(post_serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def delete_post(request, id):
    try:
        post = Post.objects.get(id=id)
    except Post.DoesNotExist:
        return Response({"message": "No existe la publicación"}, status=status.HTTP_404_NOT_FOUND)

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

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def react_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({"message": "La publicación no existe."}, status=status.HTTP_404_NOT_FOUND)
    try:
        reaction = Reaction.objects.get(id=request.data.get("reaction_id", None))
    except Reaction.DoesNotExist:
        reaction_serializer = ReactionSerializer(data=request.data)
        if reaction_serializer.is_valid():
            reaction_serializer.save(post=post, user=request.user)
            return Response(reaction_serializer.data, status=status.HTTP_201_CREATED)
        return Response(reaction_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if reaction.emoji == request.data.get("emoji", None):
        reaction.delete()
        return Response({"message": "Tu reacción fue removida"}, status=status.HTTP_200_OK)
    else:
        reaction_serializer = ReactionSerializer(reaction, data=request.data)
        if reaction_serializer.is_valid():
            reaction_serializer.save()
            return Response(reaction_serializer.data, status=status.HTTP_200_OK)
        return Response(reaction_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def comment_post(request):
    try:
        post = Post.objects.get(id=request.data.get("post_id", None))
    except Post.DoesNotExist:
        return Response({"message": "No existe la publicación"}, status=status.HTTP_404_NOT_FOUND)

    if request.data.get("parent_id", None):
        parent = Comment.objects.get(id=request.data.get("parent_id", None))
    else:
        parent = None

    # comment_serializer = CommentSerializer(data={
    #     "post": post,
    #     "content": request.data.get("content", None),
    #     "user": request.user.id,
    #     "parent_id": request.data.get("parent_id", None)
    # })

    comment_serializer = CommentSerializer(data=request.data)
    
    if comment_serializer.is_valid(raise_exception=True):
        comment_serializer.save(user=request.user, post=post, parent_id=parent.id if parent else None)
    
        return Response(comment_serializer.data, status=status.HTTP_200_OK)
    
    return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def comments_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({"message": "No existe la publicación"}, status=status.HTTP_404_NOT_FOUND)
    comments_serializer = CommentSerializer(post.comments.filter(parent=None).order_by("-created_at"), many=True)
    return Response(comments_serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def comment_replies(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response({"message": "No existe la publicación"}, status=status.HTTP_404_NOT_FOUND)
    replies_serializer = CommentSerializer(comment.replies.order_by("created_at"), many=True)
    return Response(replies_serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_comment(request, id):
    try:
        comment = Comment.objects.get(id=id)
    except Comment.DoesNotExist:
        return Response({"message": "No existe el comentario"}, status=status.HTTP_404_NOT_FOUND)

    comment_serializer = CommentSerializer(comment, data=request.data)
    
    if comment_serializer.is_valid():
        return Response(comment_serializer.data, status=status.HTTP_200_OK)
    
    return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_comment(request, id):
    try:
        comment = Comment.objects.get(id=id)
    except Comment.DoesNotExist:
        return Response({"message": "No existe el comentario"}, status=status.HTTP_404_NOT_FOUND)

    comment.delete()
    return Response({"message": "Comentario eliminado con exito."}, status=status.HTTP_200_OK)
