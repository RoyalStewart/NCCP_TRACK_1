from django.db import models
from Track1 import settings

# Create your models here.
class SensorList(models.Model):
	name = models.CharField(max_length=255)
	description = models.CharField(max_length=255)
	image = models.ImageField(upload_to='Sensors')

class PeoplesList(models.Model):
	name = models.CharField(max_length=225)
	affiliation = models.CharField(max_length=225)
	component = models.CharField(max_length=225)
	title = models.CharField(max_length=255)
	primaryResearchAreas = models.CharField(max_length=255)
	image = models.ImageField(upload_to='People')
	webPage= models.CharField(max_length=225)
	email = models.CharField(max_length=225)

