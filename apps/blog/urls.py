from django.urls import path
from .views import create_post, all_post, post_detail

urlpatterns = [
    path('create', create_post, name='create_post'),
    path('', all_post, name='all_post'),
    path('<str:slug>', post_detail, name='post_detail'),
]
