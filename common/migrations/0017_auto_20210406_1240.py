# Generated by Django 3.1.5 on 2021-04-06 12:40

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0016_auto_20210406_1238'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='answer_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 6, 12, 40, 21, 191461)),
        ),
        migrations.AlterModelTable(
            name='vaccinestatus',
            table='vaccine_status',
        ),
    ]