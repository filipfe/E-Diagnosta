from apps.SKP.models import SKP

from django.db import models
from django.contrib.auth.models import AbstractUser

USER = 'user'
STATION = 'station'
ADMIN = 'admin'
TYPES = [
    (USER, 'user'),
    (STATION, 'station'),
    (ADMIN, 'admin'),
]

class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=15)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    type = models.CharField(max_length=255, choices=TYPES)
    skp = models.ForeignKey(SKP, on_delete=models.CASCADE, blank=True, null=True, related_name='user')
    is_verified = models.BooleanField(default=False)

    username = models.CharField(max_length=255, null=True, blank=True, unique=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return '{} - {} - {} - {} - {}'.format(
            self.pk,
            self.email,
            self.phone,
            self.first_name,
            self.last_name,
        )