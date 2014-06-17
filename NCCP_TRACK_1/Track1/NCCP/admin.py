from django.contrib import admin
from .models import sensorList
from .models import peoplesList

# Register your models here.
admin.site.register(sensorList)
admin.site.register(peoplesList)
