from django.test import TestCase
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from gear_vibes_app.models import UserProfile, Tag, Review
from gear_vibes_app.serializers import UserProfileSerializer, ReviewSerializer
import json


# Model tests
class UserProfileTestCase(TestCase):

    def setUp(self):
        User.objects.create(username='brennon')

    def test_userprofile_is_created_on_user_creation(self):
        user = User.objects.get()
        self.assertEqual(UserProfile.objects.count(), 1)
        self.assertEqual(UserProfile.objects.get().user, user)
        self.assertEqual(UserProfile.objects.get().user.username, 'brennon')

    def test_userprofile_serializer_returns_users_total_posts(self):
        user_profile = UserProfile.objects.get()
        data = {
            'title': 'New Product Review',
            'intro': 'Let me tell you about this product',
            'body': 'This was a great product',
            'author': User.objects.get(),
            'block_quote': 'This is a blockquote',
            'category': 'pho',
            'video_url': 'www.youtube.com',
            'rating': [
                {'title': 'quality', 'value': 5.0},
                {'title': 'takes pics', 'value': 9.5},
                {'title': 'lens', 'value': 9.5}
            ]
        }
        Review.objects.create(**data)
        Review.objects.create(**data)
        serializer = UserProfileSerializer(user_profile)
        self.assertEqual(serializer.data.get('total_posts'), 2)


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
            category='pho',
            video_url='www.youtube.com',
            rating=[
                {'title': 'quality', 'value': 5.0},
                {'title': 'takes pics', 'value': 9.5},
                {'title': 'lens', 'value': 9.5}
            ]
        )
        review.tags.add(tag1)
        review.tags.add(tag2)
        review.save()

    def test_review_is_created_with_required_fields(self):
        review = Review.objects.get()
        tag1 = Tag.objects.get(name='tag1')
        tag2 = Tag.objects.get(name='tag2')
        self.assertEqual(review.author.username, 'brennon')
        self.assertEqual(
            review.rating,
            [{'title': 'quality', 'value': 5.0}, {'title': 'takes pics', 'value': 9.5}, {'title': 'lens', 'value': 9.5}]
        )
        self.assertIn(tag1, review.tags.all())
        self.assertIn(tag2, review.tags.all())
        self.assertEqual(review.category, 'pho')

    def test_review_serializer_returns_rating_average(self):
        review = Review.objects.get()
        serializer = ReviewSerializer(review)
        self.assertEqual(serializer.data.get('rating_average'), 8.0)


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


class TokenAuthTestCase(APITestCase):

    def _create_django_user(self):
        self.user = User.objects.create(username="testuser")
        self.user.set_password("asdf")
        self.token = Token.objects.get()

    def _create_auth_token(self):
        self.token = Token.objects.create(user=self.user)

    def login(self):
        self._create_django_user()
        # self._create_auth_token() # token is created on user post_save signal
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def logout(self):
        self.client.logout()

    def get_json(self, url):
        response = self.client.get(url)
        return response, json.loads(response.content.decode('utf-8'))

    def test_list_create_view_returns_three_review_objects(self):
        self.login()
        review1 = {
                'product_name': 'iPad 2',
                'title': 'Test Review',
                'intro': 'Let me tell you about this product',
                'body': 'This was an ok product',
                'author': self.user.pk,
                'block_quote': 'My sweet quote',
                'category': 'pho',
                'video_url': 'www.youtube.com',
                'rating': [{'title': 'point1', 'value': 5}, {'title': 'point2', 'value': 5}],
                'tags': [{'name': 'test tag'}, {'name': 'another_tag'}]
        }
        review2 = {
                'product_name': 'iPad 2',
                'title': 'Test Review',
                'intro': 'Let me tell you about this product',
                'body': 'This was an ok product',
                'author': self.user.pk,
                'block_quote': 'My sweet quote',
                'category': 'mus',
                'video_url': 'www.youtube.com',
                'rating': [{'title': 'point1', 'value': 5}, {'title': 'point2', 'value': 5}],
                'tags': [{'name': 'test tag'}, {'name': 'another_tag'}]
        }
        review3 = {
                'product_name': 'iPad 2',
                'title': 'Test Review',
                'intro': 'Let me tell you about this product',
                'body': 'This was an ok product',
                'author': self.user.pk,
                'block_quote': 'My sweet quote',
                'category': 'mob',
                'video_url': 'www.youtube.com',
                'rating': [{'title': 'point1', 'value': 5}, {'title': 'point2', 'value': 5}],
                'tags': [{'name': 'test tag'}, {'name': 'another_tag'}]
        }
        reviews = [review1, review2, review3]
        for review in reviews:
            self.client.post(reverse('review_list_create_api_view'), format='json', data=review)
        json_response = self.client.get(reverse('review_list_create_api_view')).json()
        self.assertEqual(len(json_response.get('reviews')), 3)

    def test_user_can_create_review_with_authenticated_request(self):
        self.login()
        data = {
                'product_name': 'iPad 2',
                'title': 'Test Review',
                'intro': 'Let me tell you about this product',
                'body': 'This was an ok product',
                'author': self.user.pk,
                'block_quote': 'My sweet quote',
                'category': 'pho',
                'video_url': 'www.youtube.com',
                'rating': [{'title': 'point1', 'value': 5}, {'title': 'point2', 'value': 5}],
                'tags': [{'name': 'test tag'}, {'name': 'another_tag'}]
        }
        response = self.client.post(reverse('review_list_create_api_view'), format='json', data=data)
        self.assertEqual(Review.objects.count(), 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_review_create_api_does_not_create_review_with_unauthenticated_requests(self):
        author = User.objects.create(username='brennon')
        author.set_password('safepass')
        author.save()
        data = {
                'product_name': 'iPad 2',
                'title': 'Test Review',
                'intro': 'Let me tell you about this product',
                'body': 'This was an ok product',
                'author': author.pk,
                'block_quote': 'My sweet quote',
                'category': 'pho',
                'video_url': 'www.youtube.com',
                'rating': [{'title': 'point1', 'value': 5}, {'title': 'point2', 'value': 5}],
                'tags': [{'name': 'test'}]
        }
        response = self.client.post(reverse('review_list_create_api_view'), format='json', data=data)
        self.assertEqual(Review.objects.count(), 0)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_can_retrieve_any_review_on_get_request(self):
        new_user = User.objects.create(username='testtest')
        data = {
                'product_name': 'iPad 2',
                'title': 'Test Review',
                'body': 'This was an ok product',
                'author': new_user,
                'block_quote': 'My sweet quote',
                'category': 'pho',
                'rating': [{'title': 'point1', 'value': 5}, {'title': 'point2', 'value': 5}],
        }
        Review.objects.create(**data)
        response = self.client.get(reverse('review_retrieve_update_api_view', kwargs={'pk': 7}))
        self.assertEqual(response.data.get('id'), 7)
        self.assertEqual(response.data.get('product_name'), 'iPad 2')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_current_user_gets_own_userprofile_data_on_nav_to_dashboard(self):
        self.login()
        response = self.client.get(reverse('my_profile_api_view'))
        json_response = response.json()
        self.assertEqual(json_response.get('id'), self.user.pk)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
