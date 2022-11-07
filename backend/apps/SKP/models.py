from django.db import models

class SKP(models.Model):
    login_number = models.DecimalField(max_digits=255, decimal_places=0, unique=True)
    password = models.CharField(max_length=255)
    image = models.ImageField(upload_to='SKP')
    name = models.CharField(max_length=255, unique=True)
    city = models.CharField(max_length=255)
    is_verified = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'SKP'

    def __str__(self):
        return "{} - {} - {}".format(
            self.pk,
            self.login_number,
            self.name,
            )
    