from .serializers import *

from apps.Auth.utils import Util

from rest_framework import generics
from rest_framework.response import Response

class ContactView(generics.GenericAPIView):
    serializer_class = ContactSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        first_name = serializer.data['first_name']
        last_name = serializer.data['last_name']
        email = serializer.data['email']
        phone = serializer.data['phone']
        message = serializer.data['message']

        subject = str(first_name + ' ' + last_name)

        email_subject = 'E-Diagnosta - Kontakt: ' + email + ', ' + subject
        print(subject)
        email_body = 'Email: ' + email + '\nImię i nazwisko: ' + first_name + ' ' + last_name + '\nNumer telefonu: ' + phone + '\n\n' + message
        data = {'email_body': email_body, 'to_email': 'divideproject.business@gmail.com', 'email_subject': email_subject}
        Util.send_email(data)

        return Response({'Message has been sent'})