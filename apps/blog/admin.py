from django.contrib import admin
from .models import Tag, Post
from django.utils.dateformat import DateFormat
from django.forms import TextInput

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    list_display_links = ('name', )

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'published', 'view_count', 'formatted_created_at')
    list_display_links = ('title', )
    search_fields = ('title', 'content')
    list_filter = ('published', 'created_at')
    prepopulated_fields = {'slug': ('title',)}

    def formatted_created_at(self, obj):
        return DateFormat(obj.created_at).format('d F Y')

    readonly_fields = ('image_preview',)
