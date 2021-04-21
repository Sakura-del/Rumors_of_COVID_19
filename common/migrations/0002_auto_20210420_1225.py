# Generated by Django 3.1.5 on 2021-04-20 12:25

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='answer_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 20, 12, 25, 16, 519991)),
        ),
        migrations.AlterField(
            model_name='headlinesnews',
            name='summary',
            field=models.CharField(max_length=1000),
        ),
        migrations.AlterField(
            model_name='vaccinestatus',
            name='update_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 20, 12, 25, 16, 528967)),
        ),
    ]