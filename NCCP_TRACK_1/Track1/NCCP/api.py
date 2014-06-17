from tastypie.resources import ModelResource
from myapp.models import Entry

class peoplesListResource(ModelResource):
	class Meta:
		queryset = Entry.objects.all()
		resource_name = 'peoplesList'
