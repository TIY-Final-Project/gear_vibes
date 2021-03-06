import os
from django.db import models
from django.contrib.postgres.fields import JSONField
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django_resized import ResizedImageField
from gear_vibes.custom_storages import MediaStorage, DefaultStorage


def get_storage_class():
    if 'RDS_DB_NAME' in os.environ.keys():
        return MediaStorage()
    return DefaultStorage()


class UserProfile(models.Model):
    user = models.OneToOneField(User)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=40, blank=True, null=True)
    bio = models.TextField(blank=True)
    profile_photo = ResizedImageField(size=[1920, 1080], blank=True, null=True, upload_to='profile_images', storage=get_storage_class())
    joined = models.DateTimeField(auto_now_add=True)
    facebook_link = models.CharField(max_length=50, null=True, blank=True)
    twitter_link = models.CharField(max_length=50, null=True, blank=True)
    instagram_link = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        if self.first_name and self.last_name:
            return '{} {}'.format(self.first_name, self.last_name)
        return self.user.username


class Tag(models.Model):
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name


class Review(models.Model):
    CATEGORY_CHOICES = (
        ('pho', 'Photography'),
        ('mus', 'Music Gear'),
        ('mob', 'Mobile Tech')
    )
    product_name = models.CharField(max_length=40)
    title = models.CharField(max_length=60)
    intro = models.TextField()
    body = models.TextField()
    author = models.ForeignKey(User)
    block_quote = models.CharField(max_length=200)
    video_url = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=3, choices=CATEGORY_CHOICES)
    rating = JSONField()
    tags = models.ManyToManyField(Tag, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return '{} - {}'.format(self.product_name, self.author)


class GalleryImage(models.Model):
    review = models.ForeignKey(Review)
    image = ResizedImageField(size=[1920, 1080], blank=True, null=True, upload_to='review_images', storage=get_storage_class())
    caption = models.CharField(max_length=30, blank=True, null=True)
    featured = models.BooleanField(default=False)


@receiver(post_save, sender=User)
def create_user_profile(sender, **kwargs):
    user_instance = kwargs.get('instance')
    if kwargs.get('created'):
        UserProfile.objects.create(user=user_instance)
        Token.objects.create(user=user_instance)
