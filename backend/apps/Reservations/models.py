from django.db import models

class Reservations(models.Model):
    user = models.ForeignKey()
    skp = models.ForeignKey()
    date = models.Da
