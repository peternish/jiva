# Generated by Django 4.0.2 on 2022-02-26 16:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("klinik", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="account",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.DeleteModel(
            name="Account",
        ),
    ]
