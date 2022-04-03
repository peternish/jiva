# Generated by Django 4.0.3 on 2022-04-03 16:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('klinik', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='JadwalTenagaMedis',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('quota', models.IntegerField()),
                ('day', models.CharField(choices=[('mon', 'Monday'), ('tue', 'Tuesday'), ('wed', 'Wednesday'), ('thu', 'Thursday'), ('fri', 'Friday'), ('sat', 'Saturday'), ('sun', 'Sunday')], max_length=3)),
                ('tenaga_medis', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='jadwal_tenaga_medis', to='klinik.tenagamedisprofile')),
            ],
        ),
        migrations.CreateModel(
            name='JadwalPasien',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('jadwalTenagaMedis', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jadwal.jadwaltenagamedis')),
                ('lamaranPasien', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='klinik.lamaranpasien')),
            ],
        ),
    ]
