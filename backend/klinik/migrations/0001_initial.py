# Generated by Django 4.0.3 on 2022-04-03 16:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Cabang",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("location", models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name="Klinik",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("sik", models.FileField(upload_to="")),
            ],
        ),
        migrations.CreateModel(
            name="LamaranPasien",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nik", models.CharField(max_length=20)),
                ("fields", models.JSONField(default=list, verbose_name="Fields")),
            ],
        ),
        migrations.CreateModel(
            name="Profile",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "role",
                    models.CharField(
                        choices=[
                            ("owner", "Owner"),
                            ("staf", "Staf"),
                            ("tenaga_medis", "Tenaga Medis"),
                        ],
                        max_length=30,
                    ),
                ),
                (
                    "account",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="OwnerProfile",
            fields=[
                (
                    "profile_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="klinik.profile",
                    ),
                ),
            ],
            bases=("klinik.profile",),
        ),
        migrations.CreateModel(
            name="DynamicForm",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("formtype", models.CharField(max_length=100)),
                ("fields", models.JSONField(default=list, verbose_name="Fields")),
                (
                    "cabang",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="klinik.cabang"
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="cabang",
            name="klinik",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="klinik.klinik"
            ),
        ),
        migrations.CreateModel(
            name="TenagaMedisProfile",
            fields=[
                (
                    "profile_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="klinik.profile",
                    ),
                ),
                ("sip", models.FileField(upload_to="")),
                (
                    "cabang",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="tenaga_medis",
                        to="klinik.cabang",
                    ),
                ),
            ],
            bases=("klinik.profile",),
        ),
        migrations.CreateModel(
            name="StafProfile",
            fields=[
                (
                    "profile_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="klinik.profile",
                    ),
                ),
                (
                    "cabang",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="staf",
                        to="klinik.cabang",
                    ),
                ),
            ],
            bases=("klinik.profile",),
        ),
        migrations.AddField(
            model_name="klinik",
            name="owner",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, to="klinik.ownerprofile"
            ),
        ),
    ]
