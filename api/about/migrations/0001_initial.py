# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-05-25 17:18
from __future__ import unicode_literals

import about.models
import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AboutModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='Title')),
                ('cover_picture', models.ImageField(blank=True, upload_to=about.models.upload_path, verbose_name='Cover Picture')),
                ('content', ckeditor.fields.RichTextField(verbose_name='Content')),
            ],
        ),
    ]