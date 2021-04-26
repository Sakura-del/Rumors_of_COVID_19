# Generated by Django 3.1.5 on 2021-04-25 16:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0002_auto_20210425_1609'),
    ]

    operations = [
        migrations.AddField(
            model_name='rumorinfo',
            name='urlid',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='currentvaccinations',
            name='date',
            field=models.DateField(default=datetime.datetime(2021, 4, 25, 16, 10, 26, 449988)),
        ),
        migrations.AlterField(
            model_name='vaccinestatus',
            name='update_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 25, 16, 10, 26, 452014)),
        ),
    ]
