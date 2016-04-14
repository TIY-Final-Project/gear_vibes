from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from rest_framework import generics, views
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from gear_vibes_app.models import Tag, Review, UserProfile
from gear_vibes_app.serializers import UserSerializer, ReviewSerializer, GalleryImageSerializer, \
        TagSerializer, UserProfileSerializer
from gear_vibes_app.permissions import IsAuthorOrReadOnly, IsOwnerOrReadOnly


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class ReviewCreateAPIView(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        submitted_tags = [tag.get('name') for tag in request.data.get('tags')]
        tag_ids = []
        for tag in submitted_tags:
            try:
                existing_tag = Tag.objects.get(name=tag)
                tag_ids.append(existing_tag.pk)
            except ObjectDoesNotExist:
                new_tag = Tag.objects.create(name=tag)
                tag_ids.append(new_tag.pk)
        request.data['tags'] = tag_ids
        return super().create(request, *args, **kwargs)


class GalleryImageCreateAPIView(generics.CreateAPIView):
    serializer_class = GalleryImageSerializer
    permission_classes = (IsAuthenticated,)


class TagCreateAPIView(generics.CreateAPIView):
    serializer_class = TagSerializer
    permission_classes = (IsAuthenticated,)


class MyProfileReviewListAPIView(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        reviews = Review.objects.filter(author=self.request.user)
        return reviews


class ReviewRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (IsAuthorOrReadOnly,)


class UserProfileRetrieveUpdateAPIView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = (IsOwnerOrReadOnly,)


# class MyProfileAPIView(generics.ListAPIView):
#     serializer_class = UserProfileSerializer
#     permission_classes = (IsAuthenticated,)

#     def get_queryset(self):
#         return UserProfile.objects.filter(user=self.request.user.pk)


class MyAwesomeProfileAPIView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        profile = UserProfile.objects.get(user=request.user)
        serializer = UserProfileSerializer(profile)
        return JsonResponse(serializer.data)


class TagRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


@api_view(['POST'])
def login_api_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    response_content = {}
    if user is not None:
        serializer = UserSerializer(user)
        if user.is_active:
            login(request, user)
            response_content = {'user': serializer.data, 'success': user.is_authenticated()}
            return JsonResponse(response_content)
    else:
        response_content = {'user': None, 'success': False}
        return JsonResponse(response_content)


@api_view()
def logout_api_view(request):
    serializer = UserSerializer(request.user)
    logout(request)
    return JsonResponse({'user': serializer.data, 'logged_out': True})
