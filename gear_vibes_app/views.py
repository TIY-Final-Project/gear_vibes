from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import AnonymousUser
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from gear_vibes_app.serializers import UserSerializer


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)



@api_view(['POST'])
def login_api_view(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
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
