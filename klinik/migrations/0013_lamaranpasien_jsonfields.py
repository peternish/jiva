# Generated by Django 4.0.3 on 2022-03-31 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('klinik', '0012_lamaranpasien_jadwalpasien'),
    ]

    operations = [
        migrations.AddField(
            model_name='lamaranpasien',
            name='JSONfields',
            field=models.JSONField(default=dict),
        ),
    ]
