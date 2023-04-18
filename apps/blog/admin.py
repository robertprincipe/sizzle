from django.contrib import admin
from .models import Tag, Post

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'slug', 'reading_time', 'published', 'created_at', 'updated_at')
    search_fields = ('title', 'content')
    list_filter = ('published', 'created_at', 'updated_at')
    prepopulated_fields = {'slug': ('title',)}