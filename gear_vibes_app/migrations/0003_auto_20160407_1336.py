# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-07 13:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gear_vibes_app', '0002_auto_20160407_0223'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='video_url',
            field=models.TextField(blank=True, null=True),
        ),
    ]
