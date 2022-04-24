# django imports
from django.core.mail import send_mail
from django.utils.html import strip_tags
from django.conf import settings


def send_confirmation_email(fields):
    context = {
        "nik" : "123321123321",
        "tanggal" : "21 April 2022",
        "jam_kedatangan" : "13:00",
        "dokter" : "dr. Budi Budiman, Sp.A",
    }
    subject = "Pendaftaran Berhasil"
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [ get_fields_attribute_value(fields, "email") ]
    html_message = compose_email_body(context)
    send_mail(
        subject=subject, 
        message=strip_tags(html_message), 
        from_email=from_email, 
        recipient_list=recipient_list,
        fail_silently=False,
        html_message=html_message
    )

def get_fields_attribute_value(fields, attribute_name):
    for field in fields:
        field_name = field.get("name")
        if field_name.lower() == attribute_name:
            return field["value"]
    return None

def compose_email_body(context):
    with open("klinik/templates/mail_template.html") as template_file:
        template = template_file.read()
        for key, value in context.items():
            template = template.replace("{{ %s }}" % (key), value)
    return template
