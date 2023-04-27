from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser, PermissionsMixin)
from django.core.exceptions import ValidationError
import re



class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        print(extra_fields)
        if not email:
            raise ValueError('El correo electrónico es requerido.')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        print(extra_fields)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.role=4
        user.verified=True
        user.save(using=self._db)

        return user



class User(AbstractBaseUser, PermissionsMixin):
    class Meta:
        db_table="users"
        verbose_name="usuario"
        verbose_name_plural="usuarios"

    roles = (
        (1, 'User'),
        (2, 'Editor'),
        (3, 'Moderator'),
        (4, 'Admin'),
    )

    def validate_username(username):
        pattern_special_characters = r'\badmin\b|[!@#$%^~&*()_+-=[]{}|;:",.<>/?]|\s'
        if re.search(pattern_special_characters, username):
            raise ValidationError('Nombre de usuario contiene caracteres invalidos')
        return re.sub(pattern_special_characters, '', username)    

    username = models.CharField(max_length=255, db_index=True, unique=True, validators=[validate_username])
    email = models.EmailField(max_length=255, unique=True, db_index=True)
    picture = models.ImageField(upload_to="users/profile/", blank=True, null=True, verbose_name='Picture')
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    banner = models.ImageField(upload_to="users/banner/", blank=True, null=True, verbose_name='Banner')
    
    profile_info = models.TextField(max_length=150, null=True, blank=True)

    role = models.CharField(max_length=10, choices=roles, default=1)

    verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    def get_picture(self):
        if self.picture:
            return self.picture.url
        return ''

    def get_banner(self):
        if self.banner:
            return self.banner.url
        return ''
