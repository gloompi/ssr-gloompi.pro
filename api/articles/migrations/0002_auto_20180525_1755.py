# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-05-25 17:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ArticleCategoryModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='Title')),
            ],
        ),
        migrations.AddField(
            model_name='articlemodel',
            name='category',
            field=models.ManyToManyField(to='articles.ArticleCategoryModel'),
        ),
    ]