from django.contrib.auth.models import User
from rest_framework import serializers
from gear_vibes_app.models import UserProfile, Review, Tag


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

    class Meta:
        model = UserProfile


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
