# Generated by Django 3.1.5 on 2021-04-09 14:37

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0020_auto_20210409_1414'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='answer_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 9, 14, 37, 0, 465639)),
        ),
        migrations.AlterField(
            model_name='rumorinfo',
            name='author',
            field=models.CharField(default='中国互联网联合辟谣', max_length=200),
        ),
        migrations.AlterField(
            model_name='rumorinfo',
            name='authordesc',
            field=models.CharField(default='中国互联网联合辟谣', max_length=200),
        ),
        migrations.AlterField(
            model_name='vaccinestatus',
            name='update_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 9, 14, 37, 0, 475757)),
        ),
    ]
