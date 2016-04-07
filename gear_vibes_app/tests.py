from django.test import TestCase
from django.utils import timezone
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase, APIClient, APIRequestFactory, force_authenticate
from gear_vibes_app.models import UserProfile, Tag, Review
from gear_vibes_app.serializers import UserSerializer
from gear_vibes_app.views import ReviewCreateAPIView


# Model tests
class UserProfileTestCase(TestCase):

    def setUp(self):
        User.objects.create(username='brennon')

    def test_userprofile_is_created_on_user_creation(self):
        user = User.objects.get()
        self.assertEqual(UserProfile.objects.count(), 1)
        self.assertEqual(UserProfile.objects.get().user, user)
        self.assertEqual(UserProfile.objects.get().user.username, 'brennon')


class ReviewTestCase(TestCase):

    def setUp(self):
        user = User.objects.create(username='brennon')
        tag1 = Tag.objects.create(name='tag1')
        tag2 = Tag.objects.create(name='tag2')
        review = Review.objects.create(
            title='New Product Review',
            body='This was a great product',
            author=user,
            block_quote='This is a blockquote',
            category='cam',
            rating={'quality': 5, 'takes_pics': 10, 'lens': 10}
        )
        review.tags.add(tag1)
        review.tags.add(tag2)
        review.save()

    def test_review_is_created_with_required_fields(self):
        review = Review.objects.get()
        tag1 = Tag.objects.get(name='tag1')
        tag2 = Tag.objects.get(name='tag2')
        self.assertEqual(review.author.username, 'brennon')
        self.assertEqual(review.rating, {'quality': 5, 'takes_pics': 10, 'lens': 10})
        self.assertIn(tag1, review.tags.all())
        self.assertIn(tag2, review.tags.all())
        self.assertEqual(review.category, 'cam')

    def test_reviews_can_have_variable_length_rating_fields(self):
        review1 = Review.objects.get()
        review2 = Review.objects.create(
            title='Review 2',
            body='This was a not so great product',
            author=User.objects.get(),
            block_quote='quote quote quote',
            category='mob',
            rating={'point1': 5, 'point2': 6, 'point3': 8, 'point4': 7, 'point5': 8})

        self.assertEqual(len(review1.rating), 3)
        self.assertEqual(len(review2.rating), 5)


class UserCreateAPIViewTestCase(APITestCase):

    def test_user_create_view_will_create_user_model_and_userprofile_model(self):
        response = self.client.post(reverse('user_create_api_view'), {'username': 'brennon', 'password': 'safepass'})
        json_response = response.json()
        self.assertEqual(len(json_response.keys()), 13)
        self.assertEqual(UserProfile.objects.count(), 1)
        self.assertEqual(UserProfile.objects.get().user.username, 'brennon')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_cannot_make_get_request_to_create_api_view(self):
        json_response = self.client.get(reverse('user_create_api_view')).json()
        self.assertEqual(json_response.get('detail'), 'Method "GET" not allowed.')


class LoginAPIViewTestCase(APITestCase):

    def test_login_is_successful(self):
        self.client.post(reverse('user_create_api_view'), {'username': 'asdf', 'password': 'safepass'})
        response = self.client.post(reverse('login_api_view'), {'username': 'asdf', 'password': 'safepass'})
        json_response = response.json()
        self.assertEqual(json_response.get('user').get('username'), 'asdf')
        self.assertEqual(json_response.get('success'), True)


class LogoutAPIViewTestCase(APITestCase):

    def test_logout_is_successful(self):
        self.client.post(reverse('user_create_api_view'), {'username': 'asdf', 'password': 'safepass'})
        self.client.post(reverse('login_api_view'), {'username': 'asdf', 'password': 'safepass'})
        response = self.client.get(reverse('logout_api_view'))

        json_response = response.json()
        self.assertEqual(json_response.get('user').get('username'), 'asdf')
        self.assertEqual(json_response.get('logged_out'), True)


class ReviewCreateAPIViewTestCase(APITestCase):

    def test_review_create_api_creates_review(self):
        author = User.objects.create(username='brennon')
        author.set_password('safepass')
        author.save()
        tag = Tag.objects.create(name='test')
        self.client.post(reverse('login_api_view'), {'username': 'brennon', 'password': 'safepass'})
        data = {
                'product_name': 'iPad 2',
                'title': 'Test Review',
                'body': 'This was an ok product',
                'author': author.pk,
                'block_quote': 'My sweet quote',
                'category': 'pho',
                'rating': {'point1': 5, 'point2': 5},
                'tags': [tag.pk]
        }
        self.client.post(reverse('review_create_api_view'), format='json', data=data)
        self.assertEqual(Review.objects.count(), 1)


class ReviewRetrieveUpdateAPIViewTestCase(APITestCase):

    def setUp(self):
        author = User.objects.create(username='brennon')
        author.set_password('safepass')
        author.save()
        tag = Tag.objects.create(name='test')
        self.client.post(reverse('login_api_view'), {'username': 'brennon', 'password': 'safepass'})
        data = {
                'product_name': 'iPad 2',
                'title': 'Test Review',
                'body': 'This was an ok product',
                'author': author.pk,
                'block_quote': 'My sweet quote',
                'category': 'pho',
                'rating': {'point1': 5, 'point2': 5},
                'tags': [tag.pk]
        }
        self.client.post(reverse('review_create_api_view'), format='json', data=data)

    # def test_retrieve_update_api_view_retrieves_users_review(self):
    #     author = User.objects.get()
    #     request = self.client.get(reverse('retrieve_update_api_view'))
    #     print(request.body)
