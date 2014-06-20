from django.http import HttpResponse
from django.shortcuts import render_to_response
from .models import SensorList
from .models import PeoplesList

# Create your views here.
def Home(request):
	return render_to_response("NCCP/Home.html")
def Project(request):
	return render_to_response("NCCP/Project_Default.html")
def ProjectFunding(request):
	return render_to_response("NCCP/Project_Funding.html")
def ProjectComponents(request):
	return render_to_response("NCCP/Project_Components.html")
def ProjectSynergy(request):
	return render_to_response("NCCP/Project_Synergy.html")
def ProjectSensor(request):
	return render_to_response("NCCP/Project_Sensor.html")
def Research(request):
	return render_to_response("NCCP/Research_Default.html")
def ResearchEquipment(request):
	return render_to_response("NCCP/Research_Equipment.html")
def ResearchEdetails(request):
	return render_to_response("NCCP/Research_E-details.html")
def ResearchSensorList(request):
	return render_to_response("NCCP/Research_Sensor_List.html", {'Sensors': SensorList.objects.all()})
def ResearchLocations(request):
	return render_to_response("NCCP/Research_Locations.html")
def DataResource(request):
	return render_to_response("NCCP/Data_Resources.html")
def Education_LTL(request):
	return render_to_response("NCCP/Education_LTL.html")
def ModelOutput(request):
	return render_to_response("NCCP/Model_Output.html")
def Education(request):
	return render_to_response("NCCP/Education_Default.html")
def Footprint(request):
	return render_to_response("NCCP/Carbon_Footprint.html")
def Transect(request):
	return render_to_response("NCCP/Transect.html")
def Conductivity(request):
	return render_to_response("NCCP/Conductivity.html")
def Weather(request):
	return render_to_response("NCCP/Weather_Climate.html")
def Wind(request):
	return render_to_response("NCCP/Wind_Speed.html")
def Volumetric(request):
	return render_to_response("NCCP/Volumetric_Water.html")
def EducationClark(request):
	return render_to_response("NCCP/Education_Clark.html")
def EducationWashoe(request):
	return render_to_response("NCCP/Education_Washoe.html")
def EducationSecondary(request):
	return render_to_response("NCCP/Education_Secondary.html")
def People(request):
	return render_to_response("NCCP/People.html", {'People': PeoplesList.objects.all()})
def Libraries(request):
	return render_to_response("NCCP/Libraries_Default.html")
def LibrariesPublications(request):
	return render_to_response("NCCP/Libraries_Publications.html")
def LibrariesPublications2012(request):
	return render_to_response("NCCP/Libraries_Publications_2012.html")
def LibrariesPublications2011(request):
	return render_to_response("NCCP/Libraries_Publications_2011.html")
def LibrariesPublications2010(request):
	return render_to_response("NCCP/Libraries_Publications_2010.html")
def LibrariesPublications2009(request):
	return render_to_response("NCCP/Libraries_Publications_2009.html")
def LibrariesPhotosVideos(request):
	return render_to_response("NCCP/Libraries_Photos_Videos.html")
def Tools(request):
	return render_to_response("NCCP/Tools_Default.html")
def ToolsDemeter(request):
	return render_to_response("NCCP/Tools_Demeter.html")
def ToolsSunprism(request):
	return render_to_response("NCCP/Tools_Sunprism.html")
def ToolsWEDMIT(request):
	return render_to_response("NCCP/Tools_WEDMIT.html")
def ToolsVISTED(request):
	return render_to_response("NCCP/Tools_VISTED.html")
def ToolsATMOS(request):
	return render_to_response("NCCP/Tools_ATMOS.html")
def ContactUs(request):
	return render_to_response("NCCP/Contact_Us.html")
