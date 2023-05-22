# Generated by Django 4.1.7 on 2023-05-06 22:46

import apps.user.models
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('username', models.CharField(db_index=True, max_length=255, unique=True, validators=[apps.user.models.User.validate_username])),
                ('email', models.EmailField(db_index=True, max_length=255, unique=True)),
                ('picture', models.ImageField(blank=True, null=True, upload_to='users/profile/', verbose_name='Picture')),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('banner', models.ImageField(blank=True, null=True, upload_to='users/banner/', verbose_name='Banner')),
                ('profile_info', models.TextField(blank=True, max_length=150, null=True)),
                ('role', models.CharField(choices=[(1, 'USER'), (2, 'EDITOR'), (3, 'MODERATOR'), (4, 'ADMIN')], default=1, max_length=10)),
                ('verified', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'usuario',
                'verbose_name_plural': 'usuarios',
                'db_table': 'users',
            },
        ),
    ]
