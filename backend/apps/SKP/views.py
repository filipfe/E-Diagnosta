from .serializers import *

from django.utils.translation import gettext_lazy as _

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class SKPSignUpView(generics.GenericAPIView):
    serializer_class = SKPSignUpSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_201_CREATED)

class SKPListView(generics.ListAPIView):
    queryset = SKP
    serializer_class = SKPListSerializer