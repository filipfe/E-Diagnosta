from django.db import models

class Vehicles(models.Model):
    vehicle = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = 'Vehicles'
    
    def __str__(self):
        return '{}'.format(
            self.vehicle,
        )

class SKP(models.Model):
    address = models.CharField(max_length=255)
    community = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=15)
    nip = models.CharField(max_length=10, unique=True)
    image = models.ImageField(upload_to='skp')
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=255, db_collation='und-x-icu')
    desc = models.CharField(max_length=255)
    vehicles = models.ManyToManyField(Vehicles, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'SKP'

    def __str__(self):
        return "{} - {} - {}".format(
            self.pk,
            self.name,
            self.email,
            )