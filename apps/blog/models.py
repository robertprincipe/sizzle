from django.db import models
from django.core.validators import FileExtensionValidator, validate_slug
from django.core.exceptions import ValidationError
import re

from django.utils.safestring import mark_safe

from django_editorjs import EditorJsField

from apps.blog.storage import ImageKitStorage

# Create your models here.

def validate_tag_name(value):
    if not re.match(r'^[a-z0-9]+(?:_[a-z0-9]+)*$', value):
        raise ValidationError('El nombre del tag solo puede contener letras en minúscula, números y guiones bajos (underscore), y no puede comenzar ni terminar con un guion bajo.')

class Tag(models.Model):
    class Meta:
        db_table = "tags"
        verbose_name = "etiqueta"
        verbose_name_plural = 'etiquetas'
    name = models.CharField(max_length=120, db_index=True, validators=[validate_tag_name])
    description = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name

class Post(models.Model):

    class Meta:
        db_table = "posts"
        verbose_name = "publicación"
        verbose_name_plural = 'publicaciones'
    title = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=230, unique=True, validators=[validate_slug], db_index=True)
    cover_image = models.ImageField(upload_to='posts', storage=ImageKitStorage, null=True, blank=True, validators=[FileExtensionValidator(['jpg', 'jpeg', 'png', 'webp', 'gif'])])
    content = EditorJsField(
        editorjs_config={
            "tools": {
                "Table": {
                    "disabled": False,
                    "inlineToolbar": True,
                    "config": {"rows": 2, "cols": 3,},
                }
            }
        }
    )
    view_count = models.IntegerField(default=0)
    reading_time = models.IntegerField(default=0)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField(Tag, blank=True, null=True, related_name='posts_tags')

    def image_preview(self):
        print(self.cover_image)
        if self.cover_image:
            return mark_safe('<img src="%s" style="max-width: 300px;" />' % (self.cover_image.url))
        else:
            return '(No image)'

    def __str__(self):
        return self.title
# maick@make.com.pe
# |o293fh2ijisdj
    

# robert196@+