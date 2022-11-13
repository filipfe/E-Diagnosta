from .models import SKP
from rest_framework import serializers
from django.db.models import Avg

class SKPListSerializer(serializers.ModelSerializer):
    vehicles = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = SKP
        fields = '__all__'

class SearchSKPSerializer(serializers.ModelSerializer):
    vehicles = serializers.StringRelatedField(many=True, read_only=True)
    avg_rating = serializers.SerializerMethodField()

    def get_avg_rating(self, ob):
        return ob.opinions.all().aggregate(Avg('rating'))['rating__avg']
        
    class Meta:
        model = SKP
        fields = ['image', 'name', 'city', 'desc', 'vehicles', 'avg_rating']