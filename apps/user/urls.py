from django.urls import path

from .views import *

urlpatterns = [
    path("signup", signup),
    path("signin", signin),
]