# Generated by Django 3.1.5 on 2021-04-05 17:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0011_answer_designatedhospital_question_risklevel_travelpolicy_vaccinationpoint'),
    ]

    operations = [
        migrations.AddField(
            model_name='news',
            name='thumb_nail',
            field=models.URLField(default=''),
        ),
        migrations.AlterField(
            model_name='answer',
            name='answer_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 5, 17, 46, 32, 617467)),
        ),
    ]
