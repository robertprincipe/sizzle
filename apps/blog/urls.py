from django.urls import path
from .views import create_post, all_post, post_detail, update_post, delete_post

urlpatterns = [
    path('create', create_post, name='create_post'),
    path('', all_post, name='all_post'),
    path('<str:slug>', post_detail, name='post_detail'),
    path('<int:id>/update', update_post, name='update_post'),
    path('<int:id>/delete', delete_post, name='delete_post'),
]
