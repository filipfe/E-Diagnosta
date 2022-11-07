from .models import User, SKP
from rest_framework import serializers

class SignUpSerializer(serializers.ModelSerializer):
    image = serializers.CharField(source='skp.image')
    name = serializers.CharField(source='skp.name')
    city = serializers.CharField(source='skp.city')
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password', 'name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
            
        instance.save()

        return instance

class UserSerializer(serializers.ModelSerializer):
    image = serializers.CharField(source='skp.image')
    name = serializers.CharField(source='skp.name')
    city = serializers.CharField(source='skp.city')
    class Meta:
        model = User
        fields = '__all__'

class SKPListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SKP
        fields = ['image', 'name']
        