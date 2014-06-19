from django.contrib import admin
from .models import SensorList
from .models import PeoplesList

# Register your models here.
admin.site.register(SensorList)
admin.site.register(PeoplesList)
