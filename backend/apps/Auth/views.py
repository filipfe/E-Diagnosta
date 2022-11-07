from .serializers import *
from .utils import Util
from .models import User, SKP

from django.utils.translation import gettext_lazy as _
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.conf import settings
from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

import jwt

def index(request, *args, **kwargs):
    return render(request, 'dist/index.html')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_active_account': _('Incorrect email or password')
    }
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        token['type'] = user.type

        if user.is_verified == False:
            raise AuthenticationFailed('Activate your account')

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class SignUpView(generics.GenericAPIView):
    serializer_class = SignUpSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user_data = serializer.data
        user = User.objects.get(email=user_data['email'])
        
        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        relativeLink = reverse('activate-account')
        absurl = 'https://' + current_site + relativeLink + '?token=' + str(token)
        email_body = 'Hi ' + user.username + '\nActivate your account: ' + absurl
        data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Activate your account'}
        Util.send_email(data)

        return Response({'User created'}, status=status.HTTP_201_CREATED)

class VerifyView(generics.GenericAPIView):
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response({'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            payload = jwt.decode(token, settings.SECRET_KEY,  algorithms=['HS256'], options={"verify_signature": False})
            if User.objects.filter(pk=payload['user_id']).exists() == True:
                user = User.objects.get(pk=payload['user_id'])
                if user.is_verified:
                    return Response({'User is already verified'}, status=status.HTTP_400_BAD_REQUEST)
                User.objects.get(pk=payload['user_id']).delete()
            return Response({'Activation link expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class SKPListView(generics.ListAPIView):
    queryset = SKP
    serializer_class = SKPListSerializer
    permission_classes = [IsAuthenticated]