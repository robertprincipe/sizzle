from .models import Tag, Post, Comment, Reaction
from django.utils.dateformat import DateFormat

from django.forms import SelectMultiple

# from django.forms import CheckboxSelectMultiple
from django.db import models

from django.contrib import admin

from unfold.admin import StackedInline, TabularInline, ModelAdmin

from django import forms
from .models import Comment


class CommentInlineForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(CommentInlineForm, self).__init__(*args, **kwargs)
        if "instance" in kwargs:
            instance = kwargs["instance"]
            if instance.pk:
                self.fields["parent"].queryset = Comment.objects.filter(
                    post=instance.post, parent=None
                )


class CommentInline(StackedInline):
    model = Comment
    form = CommentInlineForm
    # formfield_overrides = {
    #     models.ManyToManyField: {"widget": Textarea(attrs={"rows": 3, "cols": 40})},
    # }
    # template = "admin/comment_inline.html"


# class CommentAdmin(admin.ModelAdmin):
#     # Sobrescribir el widget ForeignKey para filtrar comentarios por publicación y por parent null
#     def formfield_for_foreignkey(self, db_field, request, **kwargs):
#         if db_field.name == "parent":
#             # Obtener el ID de la publicación correspondiente
#             post_id = request.resolver_match.kwargs.get("object_id")
#             # Filtrar los comentarios por la publicación correspondiente y por parent null
#             kwargs["queryset"] = Comment.objects.filter(post_id=post_id, parent=None)
#         return super().formfield_for_foreignkey(db_field, request, **kwargs)


class ReactionInline(TabularInline):
    model = Reaction


@admin.register(Tag)
class TagAdmin(ModelAdmin):
    list_display = ("name", "description")
    list_display_links = ("name",)


@admin.register(Post)
class PostAdmin(ModelAdmin):
    list_display = ("title", "published", "views", "formatted_created_at")
    list_display_links = ("title",)
    search_fields = ("title", "content")
    list_filter = ["published"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [CommentInline, ReactionInline]

    formfield_overrides = {
        models.ManyToManyField: {"widget": SelectMultiple(attrs={"class": "select2"})},
    }

    def get_queryset(self, request):
        return self.model.objects.all()

    def formatted_created_at(self, obj):
        return DateFormat(obj.created_at).format("d F Y")

    # readonly_fields = ("image_preview",)
