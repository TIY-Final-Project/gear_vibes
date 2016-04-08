from django.db import models
from django.contrib.postgres.fields import JSONField
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class UserProfile(models.Model):
    user = models.OneToOneField(User)
    bio = models.TextField(blank=True)
    profile_photo = models.ImageField(blank=True, null=True, upload_to='profile_images')
    joined = models.DateTimeField(auto_now_add=True)


class Tag(models.Model):
    name = models.CharField(max_length=25)


class Review(models.Model):
    CATEGORY_CHOICES = (
        ('pho', 'Photography'),
        ('mus', 'Music Gear'),
        ('mob', 'Mobile Tech')
    )
    product_name = models.CharField(max_length=40)
    title = models.CharField(max_length=60)
    body = models.TextField()
    author = models.ForeignKey(User)
    block_quote = models.CharField(max_length=100)
    video_url = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=3, choices=CATEGORY_CHOICES)
    rating = JSONField()
    tags = models.ManyToManyField(Tag, blank=True)


class GalleryImage(models.Model):
    review = models.ForeignKey(Review)
    image = models.ImageField(blank=True, null=True, upload_to='review_images')
    caption = models.CharField(max_length=30, blank=True, null=True)
    featured = models.BooleanField(default=False)


@receiver(post_save, sender=User)
def create_user_profile(sender, **kwargs):
    user_instance = kwargs.get('instance')
    if kwargs.get('created'):
        UserProfile.objects.create(user=user_instance)
        Token.objects.create(user=user_instance)
