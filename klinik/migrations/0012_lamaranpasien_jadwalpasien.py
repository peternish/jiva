# Generated by Django 4.0.3 on 2022-03-31 10:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('klinik', '0011_merge_0007_alter_klinik_owner_0010_stafprofile_cabang'),
    ]

    operations = [
        migrations.CreateModel(
            name='LamaranPasien',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nik', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='JadwalPasien',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lamaranPasien', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='klinik.lamaranpasien')),
            ],
        ),
    ]
