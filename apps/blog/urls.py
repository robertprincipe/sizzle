from django.urls import path
from .views import *

urlpatterns = [
    path('post/create', create_post, name='create_post'),
    path('post', all_post, name='all_post'),
    path('post/<str:slug>', post_detail, name='post_detail'),
    path('post/<int:id>/update', update_post, name='update_post'),
    path('post/<int:id>/delete', delete_post, name='delete_post'),
    path('comment/<int:id>/update', update_comment, name='update_comment'),
    path('comment/<int:id>/delete', delete_comment, name='delete_comment'),
    path('comment', comment_post, name='comment_post'),
    path('react/<int:post_id>', react_post, name='react_post'),
]
