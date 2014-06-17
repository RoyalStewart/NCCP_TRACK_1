from django.http import HttpResponse
from django.shortcuts import render_to_response
from .models import SensorList
from .models import PeoplesList

# Create your views here.
def home(request):
	return render_to_response("NCCP/home.html")
def projectB(request):
	return render_to_response("NCCP/project_default.html")
def projectF(request):
	return render_to_response("NCCP/project_funding.html")
def projectC(request):
	return render_to_response("NCCP/project_components.html")
def projectS(request):
	return render_to_response("NCCP/project_synergy.html")
def projectSensor(request):
	return render_to_response("NCCP/project_sensor.html")
def research(request):
	return render_to_response("NCCP/research_default.html")
def researchE(request):
	return render_to_response("NCCP/research_equipment.html")
def researchED(request):
	return render_to_response("NCCP/research_e-details.html")
def researchSL(request):
	return render_to_response("NCCP/research_sensorlist.html", {'Sensors': SensorList.objects.all()})
def researchL(request):
	return render_to_response("NCCP/research_locations.html")
def dataresource(request):
	return render_to_response("NCCP/data_resources.html")
def education_ltl(request):
	return render_to_response("NCCP/education_ltl.html")
def modeloutput(request):
	return render_to_response("NCCP/model_output.html")
def education(request):
	return render_to_response("NCCP/education_default.html")
def footprint(request):
	return render_to_response("NCCP/carbon_footprint.html")
def transect(request):
	return render_to_response("NCCP/transect.html")
def conductivity(request):
	return render_to_response("NCCP/conductivity.html")
def weather(request):
	return render_to_response("NCCP/weather_climate.html")
def wind(request):
	return render_to_response("NCCP/wind_speed.html")
def volumetric(request):
	return render_to_response("NCCP/volumetric_water.html")
def educationC(request):
	return render_to_response("NCCP/education_clark.html")
def educationW(request):
	return render_to_response("NCCP/education_washoe.html")
def educationS(request):
	return render_to_response("NCCP/education_secondary.html")
def people(request):
	return render_to_response("NCCP/people.html", {'People': PeoplesList.objects.all()})
def libraries_default(request):
	return render_to_response("NCCP/libraries_default.html")
def libraries_publications(request):
	return render_to_response("NCCP/libraries_publications.html")
def libraries_publications_2012(request):
	return render_to_response("NCCP/libraries_publications_2012.html")
def libraries_publications_2011(request):
	return render_to_response("NCCP/libraries_publications_2011.html")
def libraries_publications_2010(request):
	return render_to_response("NCCP/libraries_publications_2010.html")
def libraries_publications_2009(request):
	return render_to_response("NCCP/libraries_publications_2009.html")
def libraries_photos_videos(request):
	return render_to_response("NCCP/libraries_photos_videos.html")
def tools_default(request):
	return render_to_response("NCCP/tools_default.html")
def tools_demeter(request):
	return render_to_response("NCCP/tools_demeter.html")
def tools_sunprism(request):
	return render_to_response("NCCP/tools_sunprism.html")
def tools_webmit(request):
	return render_to_response("NCCP/tools_webmit.html")
def tools_visted(request):
	return render_to_response("NCCP/tools_visted.html")
def tools_atmos(request):
	return render_to_response("NCCP/tools_atmos.html")
def contact_us(request):
	return render_to_response("NCCP/contact_us.html")
