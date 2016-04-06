from django.contrib.auth.models import User, AnonymousUser
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User


class AnonymousUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = AnonymousUser
