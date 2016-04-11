from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from gear_vibes_app.models import Tag
from gear_vibes_app.serializers import UserSerializer, ReviewSerializer, GalleryImageSerializer, TagSerializer


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class ReviewCreateAPIView(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        tags_list = request.data.get('tags')
        tags = [tag.get('name') for tag in tags_list]
        for tag in tags:
            try:
                Tag.objects.get(name=tag)
            except ObjectDoesNotExist:
                Tag.objects.create(name=tag)
        request.data['tags'] = list(map(lambda x: Tag.objects.get(name=x).pk, tags))
        return super().create(request, *args, **kwargs)


class GalleryImageCreateAPIView(generics.CreateAPIView):
    serializer_class = GalleryImageSerializer
    permission_classes = (IsAuthenticated,)


class TagCreateAPIView(generics.CreateAPIView):
    serializer_class = TagSerializer
    permission_classes = (IsAuthenticated,)


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
