from django.urls import path
from .views import *

urlpatterns = [
    path('posts/create', create_post, name='create_post'),
    path('posts', all_post, name='all_post'),
    path('posts/<str:slug>', post_detail, name='post_detail'),
    path('posts/<int:id>/update', update_post, name='update_post'),
    path('posts/<int:id>/delete', delete_post, name='delete_post'),
    path('comments/<int:id>/update', update_comment, name='update_comment'),
    path('comments/<int:id>/delete', delete_comment, name='delete_comment'),
    path('comments', comment_post, name='comment_post'),
    path('comments/<int:post_id>', comments_post, name='comments_post'),
    path('comments/<int:comment_id>/replies', comment_replies, name='comment_replies'),
    path('react/<int:post_id>', react_post, name='react_post'),
]
