from django.db import models
from apps.Auth.models import User
from apps.SKP.models import SKP

class Opinions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    skp = models.ForeignKey(SKP, on_delete=models.CASCADE, related_name='opinions')
    content = models.TextField()
    rating = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Opinions'
    
    def __str__(self):
        return '{} - {} - {} - {}'.format(
            self.pk,
            self.user,
            self.skp,
            self.rating,
        )
