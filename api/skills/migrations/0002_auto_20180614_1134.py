# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-06-14 11:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('skills', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='skillmodel',
            name='knowledge',
            field=models.IntegerField(default=0, verbose_name='Percents'),
        ),
    ]
