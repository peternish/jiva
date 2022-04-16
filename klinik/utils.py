# django imports
from django.core.mail import send_mail
from django.conf import settings


def send_confirmation_email(fields):
    subject = "Pendaftaran Berhasil"
    message = "Terima kasih!\nPendaftaran Anda telah berhasil dilakukan!"
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [ get_fields_attribute(fields, "email") ]
    send_mail(
        subject=subject, 
        message=message, 
        from_email=from_email, 
        recipient_list=recipient_list,
        fail_silently=False
    )

def get_fields_attribute(fields, attribute):
    for field in fields:
        field_attr = field.get(attribute)
        if field_attr is not None:
            return field_attr
    return None
