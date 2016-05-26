from django.conf import settings
from django.core.files.storage import FileSystemStorage
from storages.backends.s3boto import S3BotoStorage


class DefaultStorage(FileSystemStorage):
    location = settings.MEDIA_FILES_LOCATION


class MediaStorage(S3BotoStorage):
    location = settings.MEDIA_FILES_LOCATION
