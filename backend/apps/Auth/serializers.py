import time
from .models import User, SKP
from rest_framework import serializers

class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone','password']
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

class SKPSerializer(serializers.ModelSerializer):
    class Meta:
        model = SKP
        fields = ['name', 'address', 'community', 'postal_code', 'email', 'phone', 'nip']

class SignUpSKPSerializer(serializers.ModelSerializer):
    skp = SKPSerializer()
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone', 'password', 'skp']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        skp_data = validated_data.pop('skp')
        skp = SKP.objects.create(**skp_data)
        
        instance = User.objects.create(skp=skp, **validated_data)
        
        if password is not None:
            instance.set_password(password)
            
        instance.save()

        return instance