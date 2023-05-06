from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Tag, Post, Comment, Reaction
from .serializers import (
    PostSerializer,
    TagSerializer,
    ReactionSerializer,
    CommentSerializer,
)
from .permissions import IsAuthorOrAdminOrModerator
from django.db.models import Count
from apps.user.models import User

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
                    tag, _ = Tag.objects.get_or_create(
                        name=tag_serializer.validated_data["name"]
                    )
                    tags_added.append(tag)
        except json.JSONDecodeError:
            error = {"message": "Los tags no estan bien formados"}
    return tags_added, error


def get_post(id):
    try:
        post = Post.objects.get(id=id)
        return post
    except Post.DoesNotExist:
        raise {"message": "No existe una publicación"}


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_post(request):
    post_serializer = PostSerializer(data=request.data)

    if post_serializer.is_valid():
        post = post_serializer.save(user=request.user)

        tags, error = get_tags(tags=request.data.get("tags", None))
        if error:
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        post.tags.set(tags)

        return Response(post_serializer.data, status=status.HTTP_201_CREATED)

    return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_post(request, id):
    try:
        post = get_post(id=id)
        post_serializer = PostSerializer(post, data=request.data)
        if post_serializer.is_valid():
            post = post_serializer.save()

            tags, error = get_tags(tags=request.data.get("tags", None))
            if error:
                return Response(error, status=status.HTTP_400_BAD_REQUEST)

            post.tags.set(tags)

            return Response(post_serializer.data, status=status.HTTP_200_OK)

        return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response(e, status=status.HTTP_404_NOT_FOUND)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_post(request, id):
    try:
        post = Post.objects.get(id=id)
        post.delete()
        return Response(
            {"message": "La publicación fue eliminada con exito."},
            status=status.HTTP_200_OK,
        )
    except Exception as e:
        return Response(e, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def all_post(request):
    posts = Post.post_objects.all().order_by("-created_at")

    posts = PostSerializer(posts, many=True)

    return Response(posts.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def all_tags(request):
    tags = Tag.objects.all().order_by("-created_at")

    tags = TagSerializer(tags, many=True)

    return Response(tags.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def tag_detail(request, name):
    try:
        tag = Tag.objects.get(name=name)
    except Tag.DoesNotExist:
        return Response(
            {"message": "No existe la etiqueta"}, status=status.HTTP_404_NOT_FOUND
        )

    tag = TagSerializer(tag)

    return Response(tag.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAuthorOrAdminOrModerator])
def editor_posts(request):
    posts = Post.objects.filter(user=request.user).order_by("-created_at")

    if len(posts) == 0:
        return Response(
            {"message": "No tienes publicaciones"}, status=status.HTTP_404_NOT_FOUND
        )

    posts = PostSerializer(posts, many=True)

    return Response(posts.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def post_detail(request, slug):
    try:
        post = Post.post_objects.get(slug__iexact=slug)
        post.view_count += 1
        post.save()
        post = PostSerializer(post)
        return Response(post.data, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response(
            {"message": "La publicación no existe."}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAuthorOrAdminOrModerator])
def post_data(request, id):
    try:
        post = get_post(id=id)
        return Response(PostSerializer(post).data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(e, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAuthorOrAdminOrModerator])
def post_data_x(request, id):
    post, error = get_post(id=id)
    if error:
        return Response(error, status=status.HTTP_404_NOT_FOUND)
    return Response(PostSerializer(post).data, status=status.HTTP_200_OK)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated, IsAuthorOrAdminOrModerator])
def patch_post(request, id):
    try:
        print(request.data.get("content", "No hay nada"))
        post = get_post(id=id)
        post_validate_slug = Post.objects.filter(slug=request.data.get("slug"))
        if post_validate_slug.exists() and post != post_validate_slug.first():
            return Response(
                {"message": "Nombre de publicación ya esta en uso"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        post_serializer = PostSerializer(post, data=request.data, partial=True)

        if post_serializer.is_valid():
            post = post_serializer.save()

            tags, error = get_tags(tags=request.data.get("tags", None))
            if error:
                return Response(error, status=status.HTTP_400_BAD_REQUEST)

            post.tags.set(tags)

            return Response(post_serializer.data, status=status.HTTP_200_OK)

        return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response(e, status=status.HTTP_404_NOT_FOUND)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsAuthorOrAdminOrModerator])
def delete_image_post(request, post_id):
    print(request.data)
    try:
        post = get_post(id=post_id)
        try:
            post.cover_image = None
            post.save()
            return Response(
                {"message": "Imagen de portada eliminada correctamente."},
                status=status.HTTP_200_OK,
            )
        except:
            return Response(
                {"message": "No se puedo eliminadar."},
                status=status.HTTP_400_BAD_REQUEST,
            )
    except Exception as e:
        return Response(e, status=status.HTTP_404_NOT_FOUND)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def react_post(request):
    try:
        post_id = request.data.get("post_id", None)
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response(
            {"message": "La publicación no existe."}, status=status.HTTP_404_NOT_FOUND
        )
    try:
        reaction = Reaction.objects.get(post=post, user=request.user)
    except Reaction.DoesNotExist:
        # data = {
        #     "post": post.id,
        #     "user": request.user.id,
        #     "emoji": request.data.get("emoji", None)
        # }
        reaction_serializer = ReactionSerializer(data=request.data)
        if reaction_serializer.is_valid():
            reaction_serializer.save(user=request.user, post=post)
            return Response(reaction_serializer.data, status=status.HTTP_201_CREATED)
        return Response(reaction_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if reaction.emoji == request.data.get("emoji", None):
        reaction.delete()
        return Response(
            {"message": "Tu reacción fue removida"}, status=status.HTTP_200_OK
        )
    else:
        reaction_serializer = ReactionSerializer(reaction, data=request.data)
        if reaction_serializer.is_valid():
            reaction_serializer.save()
            return Response(reaction_serializer.data, status=status.HTTP_200_OK)
        return Response(reaction_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def comment_post(request):
    try:
        post = Post.objects.get(id=request.data.get("post_id", None))
    except Post.DoesNotExist:
        return Response(
            {"message": "No existe la publicación"}, status=status.HTTP_404_NOT_FOUND
        )

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
        comment_serializer.save(
            user=request.user, post=post, parent_id=parent.id if parent else None
        )

        return Response(comment_serializer.data, status=status.HTTP_200_OK)

    return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def comments_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response(
            {"message": "No existe la publicación"}, status=status.HTTP_404_NOT_FOUND
        )
    comments_serializer = CommentSerializer(
        post.comments.filter(parent=None).order_by("-created_at"), many=True
    )
    return Response(comments_serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def comment_replies(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response(
            {"message": "No existe la publicación"}, status=status.HTTP_404_NOT_FOUND
        )
    replies_serializer = CommentSerializer(
        comment.replies.order_by("created_at"), many=True
    )
    return Response(replies_serializer.data, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_comment(request, id):
    try:
        comment = Comment.objects.get(id=id)
    except Comment.DoesNotExist:
        return Response(
            {"message": "No existe el comentario"}, status=status.HTTP_404_NOT_FOUND
        )

    comment_serializer = CommentSerializer(comment, data=request.data)

    if comment_serializer.is_valid():
        comment_serializer.save()
        return Response(comment_serializer.data, status=status.HTTP_200_OK)

    return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_comment(request, id):
    try:
        comment = Comment.objects.get(id=id)
    except Comment.DoesNotExist:
        return Response(
            {"message": "No existe el comentario"}, status=status.HTTP_404_NOT_FOUND
        )

    comment.delete()
    return Response(
        {"message": "Comentario eliminado con exito."}, status=status.HTTP_200_OK
    )


"""
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def comment_put(request):

    try:
        post = Post.objects.get_or_create(id=request.data.get("post_id", None))
    except Post.DoesNotExist:
        return Response({"message": "No existe la publicación"}, status=status.HTTP_404_NOT_FOUND)

    if request.data.get("parent_id", None):
        parent = Comment.objects.get(id=request.data.get("parent_id", None))
    else:
        parent = None

    try:
        comment = Comment.objects.get(id=id)
    except Comment.DoesNotExist:
        return Response({"message": "No existe el comentario"}, status=status.HTTP_404_NOT_FOUND)

    comment_serializer = CommentSerializer(comment, data=request.data)
    
    if comment_serializer.is_valid():
        return Response(comment_serializer.data, status=status.HTTP_200_OK)
    
    return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    comment_serializer = CommentSerializer(data=request.data)
    
    if comment_serializer.is_valid(raise_exception=True):
        comment_serializer.save(user=request.user, post=post, parent_id=parent.id if parent else None)
    
        return Response(comment_serializer.data, status=status.HTTP_200_OK)
    
    return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""


@api_view(["GET"])
def reactions_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response(
            {"message": "No existe la publicación"}, status=status.HTTP_404_NOT_FOUND
        )
    reactions_serializer = ReactionSerializer(post.reactions, many=True)
    return Response(reactions_serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def reaction_list(request, post_id):
    reactions = Reaction.objects.filter(post_id=post_id)

    # Obtener la lista de reacciones y el recuento total
    counted_reactions = reactions.values("emoji").annotate(count=Count("emoji"))
    total_count = reactions.count()
    # reaction_list = [{'emoji': item['emoji'], 'count': item['count']} for item in counted_reactions]

    # Obtener las tres reacciones más repetidas
    top_reactions = sorted(counted_reactions, key=lambda x: x["count"], reverse=True)[
        :3
    ]

    user_reaction = None
    if request.user.is_authenticated:
        user_reaction = reactions.filter(user=request.user).first()

    # Crear la respuesta
    response_data = {
        "reactions": [
            {"emoji": item["emoji"], "count": item["count"]} for item in top_reactions
        ],
        "count": total_count,
        "user_reaction": user_reaction.emoji if user_reaction else None,
    }
    return Response(response_data)
