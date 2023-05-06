from django.urls import path

from .views import *

urlpatterns = [
    path("<uuid:id>/update_profile", update_profile),
    path("<uuid:id>/<str:image>/remove", remove_image_profile),
    path("<str:username>/profile", profile_detail),
]
