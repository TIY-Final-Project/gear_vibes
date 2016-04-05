from django.test import TestCase
from django.contrib.auth.models import User
from gear_vibes_app.models import UserProfile


# Model tests
class UserProfileTestCase(TestCase):

    def setUp(self):
        User.objects.create(username='brennon')

    def test_userprofile_is_created_on_user_creation(self):
        user = User.objects.get()
        self.assertEqual(UserProfile.objects.count(), 1)
        self.assertEqual(UserProfile.objects.get().user, user)
        self.assertEqual(UserProfile.objects.get().user.username, 'brennon')

