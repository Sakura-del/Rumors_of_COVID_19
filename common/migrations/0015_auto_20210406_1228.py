# Generated by Django 3.1.5 on 2021-04-06 12:28

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0014_auto_20210406_1226'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='answer_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 6, 12, 28, 13, 934904)),
        ),
        migrations.AlterModelTable(
            name='headlinesnews',
            table='headline_news',
        ),
    ]
