from .serializers import *

from django.db.models import Q
from django.db.models.functions import comparison

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

class SKPListView(generics.ListAPIView):
    queryset = SKP.objects.filter(is_verified=True)
    serializer_class = SearchSKPSerializer

class SearchSKP(generics.ListAPIView):
    serializer_class = SKPListSerializer
    paginate_by = 10
    def get_queryset(self, **kwargs):
        queries = self.request.GET.get('q')
        c = self.request.GET.get('c')
        if queries:
            queries.split()
            q=Q()
            for x in queries:
                q &= Q(name__icontains=x)
            return SKP.objects.filter(Q(is_verified=True) & Q(q) & Q(city=c))
        return None

class SearchCities(APIView):
    serializer_class = SearchCitiesSerializer
    def get(self, request):
        c = self.request.GET.get('c')
        if c:
            cities = SKP.objects.filter(Q(is_verified=True) & Q(city__icontains=c)).order_by('city').distinct('city')
            cities_list = []
            for x in cities:
                cities_list.append(x.city)
            return Response(cities_list)

        cities = SKP.objects.filter(is_verified=True).order_by('city').distinct('city')
        cities_list = []
        for x in cities:
            cities_list.append(x.city)
        return Response(cities_list)