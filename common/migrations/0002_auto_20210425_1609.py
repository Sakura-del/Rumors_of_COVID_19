# Generated by Django 3.1.5 on 2021-04-25 16:09

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='currentvaccinations',
            name='date',
            field=models.DateField(default=datetime.datetime(2021, 4, 25, 16, 9, 25, 819428)),
        ),
        migrations.AlterField(
            model_name='vaccinestatus',
            name='update_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 25, 16, 9, 25, 821425)),
        ),
    ]
