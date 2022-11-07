from django.db import models
from django.contrib.auth.models import AbstractUser

class SKP(models.Model):
    image = models.ImageField(upload_to='skp')
    name = models.CharField(max_length=255, unique=True)
    city = models.CharField(max_length=255)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'SKP'

    def __str__(self):
        return "{} - {}".format(
            self.pk,
            self.name,
            )

USER = 'User'
STATION = 'Station'
TYPES = [
    (USER, 'User'),
    (STATION, 'Station'),
]

class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    type = models.CharField(max_length=255, choices=TYPES)
    skp = models.OneToOneField(SKP, on_delete=models.CASCADE, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return '{} - {}'.format(
            self.pk,
            self.email,
            self.first_name,
            self.last_name,
        )