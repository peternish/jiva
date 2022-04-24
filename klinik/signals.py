# Django imports
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

# Model imports
from .models import Cabang, DynamicForm, Profile

# Handle cabang creation
@receiver(post_save, sender=Cabang)
def cabang_creation_handler(sender, instance, created, **kwargs):
    if created:
        cabang = instance
        for formtype in DynamicForm.formtypes:
            DynamicForm(cabang=cabang, formtype=formtype).save()

@receiver(post_delete, sender=Profile)
def delete_related_account(sender, instance: Profile, **kwargs):
    instance.account.delete()