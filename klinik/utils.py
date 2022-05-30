# django imports
from django.core.mail import send_mail
from django.utils.html import strip_tags
from django.conf import settings

# model imports
from klinik.models import LamaranPasien
from jadwal.models import JadwalTenagaMedis

# other imports
from datetime import datetime


def send_confirmation_email(lamaran_pasien: LamaranPasien, jadwal_tenaga_medis: JadwalTenagaMedis, date: str):
    context = {
        "nik" : lamaran_pasien.nik,
        "hari_tanggal" : indonesian_date(date),
        "jam_kedatangan" : jadwal_tenaga_medis.start_time.strftime("%H:%M"),
        "dokter" : jadwal_tenaga_medis.tenaga_medis.account.full_name,
    }
    subject = "Pendaftaran Berhasil"
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [ lamaran_pasien.email ]
    html_message = compose_email_body(context)
    send_mail(
        subject=subject, 
        message=strip_tags(html_message), 
        from_email=from_email, 
        recipient_list=recipient_list,
        fail_silently=True,
        html_message=html_message
    )


def compose_email_body(context):
    with open("klinik/templates/mail_template.html") as template_file:
        template = template_file.read()
        for key, value in context.items():
            template = template.replace("{{ %s }}" % (key), value)
    return template


def indonesian_date(date: str):
    day = {
        "Monday": "Senin",
        "Tuesday": "Selasa",
        "Wednesday": "Rabu",
        "Thursday": "Kamis",
        "Friday": "Jumat",
        "Saturday": "Sabtu",
        "Sunday": "Minggu"
    }
    month = {
        "January": "Januari",
        "February": "Februari",
        "March": "Maret",
        "April": "April",
        "May": "Mei",
        "June": "Juni",
        "July": "Juli",
        "August": "Agustus",
        "September": "September",
        "October": "Oktober",
        "November": "November",
        "December": "Desember"
    }
    date = datetime.strptime(date, "%Y-%m-%d").strftime("%A, %d %B %Y")
    for english, indonesian in day.items():
        date = date.replace(english, indonesian)
    for english, indonesian in month.items():
        date = date.replace(english, indonesian)
    return date
