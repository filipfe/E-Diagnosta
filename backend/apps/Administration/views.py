from apps.Auth.models import *
from .serializers import *

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

class SKPVerifyListView(generics.ListAPIView):
    queryset = SKP.objects.filter(user__is_verified=True).filter(is_verified=False).order_by('created_at')
    serializer_class = SKPVerifySerializer

class SKPVerifyPostView(APIView):
    def post(self, request):
        data = request.data['data']
        action = request.data['action']
        if action == 'verify':
            SKP.objects.filter(id__in=data).update(is_verified=True)
            return Response({'Successfully verified'})
        SKP.objects.filter(id__in=data).delete()
        return Response({'Successfully deleted'})

        
        