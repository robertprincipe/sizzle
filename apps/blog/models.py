from apps.user.models import User
from django.db import models
from django.core.validators import FileExtensionValidator, validate_slug
from django.core.exceptions import ValidationError
import re
from uuid import uuid4

from colorfield.fields import ColorField
from django_editorjs import EditorJsField


def validate_tag_name(value):
    if not re.match(r"^[a-z0-9]+(?:_[a-z0-9]+)*$", value):
        raise ValidationError(
            "El nombre del tag solo puede contener letras en minúscula, números y guiones bajos (underscore), y no puede comenzar ni terminar con un guion bajo."
        )


class Tag(models.Model):
    class Meta:
        db_table = "tags"
        verbose_name = "etiqueta"
        verbose_name_plural = "etiquetas"

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False, unique=True)
    name = models.CharField(
        max_length=120, db_index=True, validators=[validate_tag_name]
    )
    color = ColorField(default="#FF0000")
    image = models.ImageField(
        max_length=200,
        upload_to="tags",
        blank=True,
        null=True,
    )
    description = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name


class Post(models.Model):
    class Meta:
        db_table = "posts"
        verbose_name = "publicación"
        verbose_name_plural = "publicaciones"
        ordering = ("-created_at",)

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(published=True)

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False, unique=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name="posts"
    )
    title = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(
        max_length=230,
        unique=True,
        blank=True,
        validators=[validate_slug],
        db_index=True,
    )
    cover_image = models.ImageField(
        upload_to="posts",
        max_length=200,
        null=True,
        blank=True,
        validators=[FileExtensionValidator(["jpg", "jpeg", "png", "webp", "gif"])],
    )
    keywords = models.CharField(max_length=255, blank=True, null=True)
    content = EditorJsField(
        editorjs_config={
            "tools": {
                "Table": {
                    "disabled": False,
                    "inlineToolbar": True,
                    "config": {
                        "rows": 2,
                        "cols": 3,
                    },
                },
            }
        },
        blank=True,
        null=True,
    )

    reading_time = models.IntegerField(default=0)
    published = models.BooleanField(default=False)
    views = models.IntegerField(default=0, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField(Tag, blank=True, related_name="posts_tags")

    post_objects = PostObjects()
    objects = models.Manager()

    def __str__(self):
        return self.title

    def get_view_count(self):
        views = ViewCount.objects.filter(post=self).count()
        return views


# maick@make.com.pe
# |o293fh2ijisdj
# robert196@+


class ViewCount(models.Model):
    post = models.ForeignKey(
        Post, related_name="post_view_count", on_delete=models.CASCADE
    )
    ip_address = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.ip_address}"


class Comment(models.Model):
    class Meta:
        db_table = "comments"
        verbose_name = "comentario"
        verbose_name_plural = "comentarios"

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    parent = models.ForeignKey(
        "self", null=True, blank=True, related_name="replies", on_delete=models.CASCADE
    )
    content = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content


class Reaction(models.Model):
    class Meta:
        db_table = "reactions"
        verbose_name = "reacción"
        verbose_name_plural = "reacciones"

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False, unique=True)
    user = models.ForeignKey(
        User, related_name="reactions", on_delete=models.CASCADE, blank=True
    )
    post = models.ForeignKey(
        Post, related_name="reactions", on_delete=models.CASCADE, blank=True
    )
    emoji = models.CharField(max_length=12)

    def __str__(self):
        return self.emoji


# register_image_signals(Tag)
# register_image_signals(Post)
