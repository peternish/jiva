# Generated by Django 4.0.3 on 2022-03-11 17:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('klinik', '0009_tenagamedisprofile_cabang_tenagamedisprofile_sip'),
    ]

    operations = [
        migrations.AddField(
            model_name='stafprofile',
            name='cabang',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='staf', to='klinik.cabang'),
            preserve_default=False,
        ),
    ]
