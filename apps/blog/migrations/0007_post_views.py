# Generated by Django 4.1.7 on 2023-06-19 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_alter_post_options_remove_post_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='views',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
