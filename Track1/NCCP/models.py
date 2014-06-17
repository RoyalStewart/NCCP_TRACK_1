from django.db import models
from Track1 import settings

# Create your models here.
class sensorList(models.Model):
	Name = models.CharField(max_length=255)
	Description = models.CharField(max_length=255)
	Image = models.ImageField(upload_to='Sensors')
