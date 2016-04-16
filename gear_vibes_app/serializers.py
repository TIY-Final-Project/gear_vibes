from django.contrib.auth.models import User
from rest_framework import serializers
from gear_vibes_app.models import UserProfile, Review, Tag, GalleryImage


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

    def create(self, validated_data):
        user = User(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            if key == 'password':
                instance.set_password(value)
            else:
                setattr(instance, key, value)
        instance.save()
        return instance


class UserProfileSerializer(serializers.ModelSerializer):
    total_posts = serializers.SerializerMethodField()
    contributed_to = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile

    def get_total_posts(self, obj):
        return Review.objects.filter(author=obj.user).count()

    def get_contributed_to(self, obj):
        reviews = Review.objects.filter(author=obj.user)
        contributed_to = list({review.category for review in reviews})
        return contributed_to

    def get_username(self, obj):
        return obj.user.username


class ReviewSerializer(serializers.ModelSerializer):
    rating_average = serializers.SerializerMethodField()

    class Meta:
        model = Review

    def get_rating_average(self, obj):
        if obj.rating:
            rating_values = [float(rating.get('value')) for rating in obj.rating]
            rating_total = sum(rating_values)
            if len(rating_values) > 0:
                return rating_total/len(rating_values)
        return 0


class GalleryImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = GalleryImage


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
