from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    if not User.objects.filter(username='admin').exists():
        User.objects.create('admin', 'admin@admin.com', 'safepass')
