from .models import SKP
from rest_framework import serializers

class SKPListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SKP
        fields = ['image', 'name', 'city', 'desc']

class SearchSKPSerializer(serializers.ModelSerializer):
    class Meta:
        model = SKP
        fields = '__all__'

class SearchCitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SKP
        fields = ['city']