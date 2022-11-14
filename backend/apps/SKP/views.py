from .serializers import *
from .models import *

from django.db.models import Q
from django.shortcuts import render

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

def skp(request, slug):
    skp = SKP.objects.get(slug=slug)
    return render(request, 'dist/index.html', {'skp': skp})

class SKPView(generics.RetrieveAPIView):
    queryset = SKP.objects.filter(is_verified=True)
    serializer_class = SKPViewSerializer
    lookup_field = 'slug'

class SKPListView(generics.ListAPIView):
    queryset = SKP.objects.filter(is_verified=True)
    serializer_class = SKPListSerializer

class SearchSKP(generics.ListAPIView):
    serializer_class = SearchSKPSerializer
    def get_queryset(self):
        q = self.request.GET.get('q')
        c = self.request.GET.get('c')
        v = self.request.GET.get('v')
        queries = Q(is_verified=True)
        if q:
            query=Q()
            for x in q.split():
                query &= Q(name__icontains=x)
            queries.add(Q(query), Q.AND)
        if c:
            queries.add(Q(city=c), Q.AND)
        if v:
            queries.add(Q(vehicles__vehicle=v), Q.AND)
        
        return SKP.objects.filter(queries)

class SearchCities(APIView):
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

class FiltersSKP(APIView):
    def get(self, request):
        cities = SKP.objects.filter(is_verified=True).order_by('city').distinct('city')
        cities_list = []
        for x in cities:
            cities_list.append(x.city)

        vehicles = Vehicles.objects.all().order_by('vehicle')
        vehicles_list = []
        for x in vehicles:
            vehicles_list.append(x.vehicle)
        
        data = {
            'cities': cities_list,
            'vehicles': vehicles_list,
        }
        return Response(data)