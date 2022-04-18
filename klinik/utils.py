# django imports
from django.core.mail import send_mail
from django.conf import settings


def send_confirmation_email(fields):
    subject = "Pendaftaran Berhasil"
    message = "Terima kasih!\nPendaftaran Anda telah berhasil dilakukan!"
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [ get_fields_attribute_value(fields, "email") ]
    send_mail(
        subject=subject, 
        message=message, 
        from_email=from_email, 
        recipient_list=recipient_list,
        fail_silently=False
    )

def get_fields_attribute_value(fields, attribute_name):
    for field in fields:
        field_name = field.get("name")
        if field_name.lower() == attribute_name:
            return field["value"]
    return None
