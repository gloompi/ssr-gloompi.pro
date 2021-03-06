# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-05-25 17:18
from __future__ import unicode_literals

import articles.models
import ckeditor.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ArticleModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='Title')),
                ('cover_picture', models.ImageField(blank=True, upload_to=articles.models.upload_path, verbose_name='Cover Picture')),
                ('content', ckeditor.fields.RichTextField(verbose_name='Content')),
                ('announce', ckeditor.fields.RichTextField(verbose_name='Announce')),
                ('meta_title', models.CharField(max_length=250, null=True, verbose_name='SEO Title')),
                ('meta_description', models.TextField(null=True, verbose_name='SEO Description')),
                ('date_added', models.DateTimeField(auto_now_add=True, verbose_name='Date added')),
                ('is_published', models.BooleanField(choices=[(True, 'Опубликовано'), (False, 'Черновик')], default=False, verbose_name='Published?')),
                ('author', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Author')),
            ],
            options={
                'ordering': ['-date_added'],
            },
        ),
    ]
