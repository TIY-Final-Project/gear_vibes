"""gear_vibes URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.conf import settings
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView
from rest_framework.authtoken import views as drf_auth_views
from gear_vibes_app import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', TemplateView.as_view(template_name='index.html'), name='index_view'),
    url(r'api/login/$', drf_auth_views.obtain_auth_token, name='login_api_view'),
    url(r'api/logout/$', auth_views.logout, name='logout_api_view'),
    url(r'^api/signup/$', views.UserCreateAPIView.as_view(), name='user_create_api_view'),
    url(r'^api/reviews/$', views.ReviewCreateAPIView.as_view(), name='review_create_api_view'),
    url(r'^api/reviews/(?P<pk>\d+)/$', views.ReviewRetrieveAPIView.as_view(), name='review_retrieve_api_view'),
    url(
        r'^api/userprofiles/(?P<pk>\d+)/$',
        views.UserProfileRetrieveUpdateAPIView.as_view(),
        name='userprofile_retrieve_update_api_view'
    ),
    url(r'^api/myprofile/$', views.MyProfileAPIView.as_view(), name='my_profile_api_view'),
    url(r'^api/user/reviews/$', views.UserReviewListAPIView.as_view(), name='user_review_list_api_view'),
    url(r'^api/galleryimages/$', views.GalleryImageCreateAPIView.as_view(), name='gallery_image_create_api_view'),
    url(r'^api/tags/$', views.TagCreateAPIView.as_view(), name='tag_create_api_view'),
    url(r'^api/tags/(?P<pk>\d+)/$', views.TagRetrieveAPIView.as_view(), name='tag_retrieve_api_view'),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url('', include('django.contrib.auth.urls', namespace='auth')),
    url(r'^media/(?P<path>.*)', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
]
