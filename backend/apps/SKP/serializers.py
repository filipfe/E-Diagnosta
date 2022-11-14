from .models import SKP
from rest_framework import serializers
from django.db.models import Avg
from apps.Opinions.models import Opinions
from apps.Auth.models import User

class SKPListSerializer(serializers.ModelSerializer):
    vehicles = serializers.StringRelatedField(many=True, read_only=True)
    avg_rating = serializers.SerializerMethodField()
    rating_count = serializers.SerializerMethodField()

    def get_avg_rating(self, ob):
        return ob.opinions.all().aggregate(Avg('rating'))['rating__avg']
    
    def get_rating_count(self, ob):
        return ob.opinions.count()
        
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

class SKPViewOpinionsSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    class Meta:
        model = Opinions
        fields = ['first_name', 'last_name', 'rating', 'content', 'created_at']

class SKPViewSerializer(serializers.ModelSerializer):
    vehicles = serializers.StringRelatedField(many=True, read_only=True)
    avg_rating = serializers.SerializerMethodField()
    rating_count = serializers.SerializerMethodField()
    opinions = SKPViewOpinionsSerializer(many=True, read_only=True)

    def get_avg_rating(self, ob):
        return ob.opinions.all().aggregate(Avg('rating'))['rating__avg']
    
    def get_rating_count(self, ob):
        return ob.opinions.count()
        
    class Meta:
        model = SKP
        fields = ['image', 'name', 'city', 'desc', 'vehicles', 'avg_rating', 'rating_count', 'opinions']