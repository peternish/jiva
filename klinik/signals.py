# Django imports
from django.db.models.signals import post_save
from django.dispatch import receiver

# Model imports
from .models import Cabang, DynamicForm

# Handle cabang creation
@receiver(post_save, sender=Cabang)
def cabang_creation_handler(sender, instance, created, **kwargs):
  if created:
      cabang = instance
      for formtype in DynamicForm.formtypes:
        DynamicForm(cabang=cabang, formtype=formtype).save()