# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-14 21:26
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('gear_vibes_app', '0011_auto_20160413_2219'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2016, 4, 14, 21, 26, 29, 25801, tzinfo=utc)),
            preserve_default=False,
        ),
    ]