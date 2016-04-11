from django.contrib import admin
from gear_vibes_app.models import UserProfile, Review, GalleryImage, Tag


admin.site.register([UserProfile, Review, GalleryImage, Tag])
