from rest_framework import serializers

class ContactSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    email = serializers.EmailField(max_length=255)
    phone = serializers.CharField(max_length=15)
    message = serializers.CharField(min_length=1)

    class Meta:
        fields = '__all__'
