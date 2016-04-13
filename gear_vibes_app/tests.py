from django.test import TestCase
from django.core.urlresolvers import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from gear_vibes_app.models import UserProfile, Tag, Review, GalleryImage
from gear_vibes_app.views import ReviewCreateAPIView
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
            category='Mobile Tech',
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

    def test_user_can_create_review_with_authenticated_request(self):
        self.login()
        data = {
                'product_name': 'iPad 2',
                'title': 'Test Review',
                'body': 'This was an ok product',
                'author': self.user.pk,
                'block_quote': 'My sweet quote',
                'category': 'Photography',
                'rating': {'point1': 5, 'point2': 5},
                'tags': [{'name': 'test tag'}, {'name': 'another_tag'}]
        }
        response = self.client.post(reverse('review_create_api_view'), format='json', data=data)
        self.assertEqual(Review.objects.count(), 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_review_create_api_does_not_create_review_with_unauthenticated_requests(self):
        author = User.objects.create(username='brennon')
        author.set_password('safepass')
        author.save()
        data = {
                'product_name': 'iPad 2',
                'title': 'Test Review',
                'body': 'This was an ok product',
                'author': author.pk,
                'block_quote': 'My sweet quote',
                'category': 'Photography',
                'rating': {'point1': 5, 'point2': 5},
                'tags': [{'name': 'test'}]
        }
        response = self.client.post(reverse('review_create_api_view'), format='json', data=data)
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
                'category': 'Photography',
                'rating': {'point1': 5, 'point2': 5},
        }
        Review.objects.create(**data)
        response = self.client.get(reverse('review_retrieve_api_view', kwargs={'pk': 5}))
        print(response.data)
        self.assertEqual(response.data.get('id'), 5)
        self.assertEqual(response.data.get('product_name'), 'iPad 2')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_upload_gallery_image(self):
    #     self.login()
    #     with open('/Users/brennon/tiy-projects/craigs_list_pkmn/media/uploads/Ninetales.jpg') as infile:
    #         suf = SimpleUploadedFile('Ninetales.jpg', infile.read(), encoding='utf-8')
    #     tag = Tag.objects.create(name='test')
    #     data = {
    #             'product_name': 'iPad 2',
    #             'title': 'Test Review',
    #             'body': 'This was an ok product',
    #             'author': self.user.pk,
    #             'block_quote': 'My sweet quote',
    #             'category': 'Photography',
    #             'rating': {'point1': 5, 'point2': 5},
    #             'tags': [tag.pk]
    #     }
    #     Review.objects.create(**data)
    #     response = self.client.post(
    #         reverse('gallery_image_create_api_view'),
    #         data={'review': Review.objects.get().pk, 'image': suf}
    #     )
    #     self.assertEqual(GalleryImage.objects.count(), 1)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
