# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-19 14:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gear_vibes_app', '0014_auto_20160416_1710'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='category',
            field=models.CharField(choices=[('pho', 'Photography'), ('mus', 'Music Gear'), ('mob', 'Mobile Tech')], max_length=3),
        ),
    ]