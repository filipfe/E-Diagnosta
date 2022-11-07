from apps.Auth.models import *
from rest_framework import serializers

class SKPVerifySerializer(serializers.ModelSerializer):
    class Meta:
        model = SKP
        fields = ['id', 'image', 'name', 'city', 'created_at']