from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import ROLES
User = get_user_model()


class UserSerializer(UserCreateSerializer):
    role = serializers.SerializerMethodField()
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            'id',
            'email',
            'username',
            'role',
            'picture',
            'banner',
            'profile_info'
        )

    def get_role(self, obj):
        return dict(ROLES).get(int(obj.role))

