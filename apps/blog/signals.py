from django.db.models.signals import pre_save, pre_delete
from django.dispatch import receiver
from django.db.models import ImageField
from django.core.files.images import ImageFile
from django.db.models.fields.files import FileField
from apps.blog.storage import ImageKitStorage


from django.db.models.fields.files import FileField
from apps.blog.storage import ImageKitStorage


@receiver(pre_save)
def pre_save_handler(sender, instance, **kwargs):
    for field in instance._meta.fields:
        if isinstance(field, (ImageField, FileField)):
            try:
                old_instance = sender.objects.get(pk=instance.pk)
                old_value = getattr(old_instance, field.name)
                new_value = getattr(instance, field.name)
                if old_value and old_value != new_value:
                    ImageKitStorage().delete(old_value.name)
            except sender.DoesNotExist:
                pass


@receiver(pre_delete)
def pre_delete_handler(sender, instance, **kwargs):
    # Busca todos los campos de imagen y archivos del modelo
    for field in instance._meta.fields:
        if isinstance(field, (ImageField, FileField)):
            try:
                # Elimina la imagen o archivo asociado a cada campo
                if getattr(instance, field.name):
                    ImageKitStorage().delete(getattr(instance, field.name).name)
            except ImageFile.DoesNotExist:
                pass
