# Generated by Django 3.1.5 on 2021-04-05 20:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0012_auto_20210405_1746'),
    ]

    operations = [
        migrations.CreateModel(
            name='TestAgent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('province', models.CharField(max_length=200)),
                ('count', models.IntegerField()),
                ('data', models.JSONField()),
            ],
            options={
                'db_table': 'test_agent',
            },
        ),
        migrations.AlterField(
            model_name='answer',
            name='answer_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 5, 20, 43, 29, 973336)),
        ),
    ]