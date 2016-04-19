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
    review_images = serializers.SerializerMethodField()
    author_name = serializers.SerializerMethodField()
    category_long_form = serializers.SerializerMethodField()

    class Meta:
        model = Review

    def get_rating_average(self, obj):
        if obj.rating:
            rating_values = [float(rating.get('value')) for rating in obj.rating]
            rating_total = sum(rating_values)
            if len(rating_values) > 0:
                return rating_total/len(rating_values)
        return 0

    def get_author_name(self, obj):
        profile = obj.author.userprofile
        if profile.first_name and profile.last_name:
            return "{} {}".format(profile.first_name, profile.last_name)
        else:
            return obj.author.username

    def get_review_images(self, obj):
        images = GalleryImage.objects.filter(review=obj)
        if any(images):
            return images
        return None

    def get_category_long_form(self, obj):
        return obj.get_category_display()


class GalleryImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = GalleryImage

    def update(self, instance, validated_data):
        instance.review = validated_data.get('review', instance.review)
        instance.image = validated_data.get('image', instance.image)
        instance.caption = validated_data.get('caption', instance.caption)
        instance.featured = validated_data.get('featured', instance.featured)
        instance.save()
        return instance


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
