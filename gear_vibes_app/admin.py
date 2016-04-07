from django.contrib import admin
from gear_vibes_app.models import UserProfile, Review


admin.site.register([UserProfile, Review])
