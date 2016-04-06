from django.test import TestCase
from django.utils import timezone
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from gear_vibes_app.models import UserProfile
from gear_vibes_app.serializers import UserSerializer


# Model tests
class UserProfileTestCase(TestCase):

    def setUp(self):
        User.objects.create(username='brennon')

    def test_userprofile_is_created_on_user_creation(self):
        user = User.objects.get()
        self.assertEqual(UserProfile.objects.count(), 1)
        self.assertEqual(UserProfile.objects.get().user, user)
        self.assertEqual(UserProfile.objects.get().user.username, 'brennon')


# API View tests
client = APIClient()


class UserCreateAPIViewTestCase(APITestCase):

    def test_user_create_view_will_create_user_model_and_userprofile_model(self):
        response = client.post(reverse('user_create_api_view'), {'username': 'brennon', 'password': 'safepass'})
        json_response = response.json()
        self.assertEqual(len(json_response.keys()), 13)
        self.assertEqual(UserProfile.objects.count(), 1)
        self.assertEqual(UserProfile.objects.get().user.username, 'brennon')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_cannot_make_get_request_to_create_api_view(self):
        json_response = client.get(reverse('user_create_api_view')).json()
        self.assertEqual(json_response.get('detail'), 'Method "GET" not allowed.')


class LoginAPIViewTestCase(APITestCase):

    def test_login_is_successful(self):
        user = User.objects.create(username='asdf', password='safepass')
        response = client.post(reverse('login_api_view'), {'username': 'asdf', 'password': 'safepass'})
        json_response = response.json()
        print(json_response.keys())
        self.assertEqual(response.user.is_authenticated(), True)
        self.assertEqual(response.user, user)
