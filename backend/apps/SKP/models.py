from django.db import models

class SKP(models.Model):
    image = models.ImageField(upload_to='skp')
    name = models.CharField(max_length=255, unique=True)
    city = models.CharField(max_length=255, db_collation='und-x-icu')
    desc = models.CharField(max_length=255)
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