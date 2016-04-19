import re
from django.core.exceptions import ObjectDoesNotExist
from django.views.generic import TemplateView
from django.http import JsonResponse
from rest_framework import generics, views, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from gear_vibes_app.models import Tag, Review, UserProfile, GalleryImage
from gear_vibes_app.serializers import UserSerializer, ReviewSerializer, GalleryImageSerializer, \
        TagSerializer, UserProfileSerializer
from gear_vibes_app.permissions import IsAuthorOrReadOnly, IsOwnerOrReadOnly


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class ReviewListCreateAPIView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def list(self, request):
        categories = ['mus', 'pho', 'mob']
        queryset = []
        for category in categories:
            queryset.append(Review.objects.filter(category=category).first())
        serializer = ReviewSerializer(queryset, many=True)
        return JsonResponse(dict(reviews=serializer.data))

    def create(self, request, *args, **kwargs):
        request.data['author'] = request.user.pk
        request.data['video_url'] = convert_video_url(request.data['video_url'])
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


class GalleryImageRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class TagCreateAPIView(generics.CreateAPIView):
    serializer_class = TagSerializer
    permission_classes = (IsAuthenticated,)


class LatestReviewListAPIView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        category = self.request.GET.get('category')
        if category:
            featured = Review.objects.filter(category=category).order_by('-created_at')
        else:
            featured = Review.objects.all().order_by('-created_at')
        return featured[:5]


class MyProfileReviewListAPIView(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        reviews = Review.objects.filter(author=self.request.user)
        return reviews


class ReviewRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (IsAuthorOrReadOnly,)


class UserProfileRetrieveUpdateAPIView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class MyAwesomeProfileAPIView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        profile = UserProfile.objects.get(user=request.user)
        serializer = UserProfileSerializer(profile)
        return JsonResponse(serializer.data)

    def put(self, request, *args, **kwargs):
        profile = UserProfile.objects.get(user=request.user)
        request.data['user'] = request.user.pk
        serializer = UserProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TagRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class CategorySearchView(TemplateView):
    template_name = 'search.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        categories = ['mus', 'pho', 'mob']
        tags = Tag.objects.all()
        tags_by_category = {}
        for category in categories:
            tag_set = []
            for review in Review.objects.filter(category=category):
                for tag in tags:
                    if tag in review.tags.all() and tag not in tag_set:
                        tag_set.append(tag)
            tags_by_category[category] = tag_set
        context['categories'] = categories
        context['tags_by_category'] = tags_by_category
        return context


def convert_video_url(url):
    if re.search(r'youtube.com', url):
        qs = re.search(r'v=.+', url)
        embed_url = 'https://youtube.com/embed/{}'.format(qs.group(0)[2:])
        return embed_url
    return None
