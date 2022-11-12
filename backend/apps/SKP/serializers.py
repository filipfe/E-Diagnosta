from .models import SKP
from rest_framework import serializers

class SKPListSerializer(serializers.ModelSerializer):
    vehicles = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = SKP
        fields = '__all__'

class SearchSKPSerializer(serializers.ModelSerializer):
    vehicles = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = SKP
        fields = ['image', 'name', 'city', 'desc', 'vehicles']
    