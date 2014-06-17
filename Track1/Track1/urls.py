from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
	url(r'^$', 'NCCP.views.home', name='home'),
	url(r'^project', 'NCCP.views.projectB', name='projectB'),
	url(r'^funding', 'NCCP.views.projectF', name='projectF'),
	url(r'^components', 'NCCP.views.projectC', name='projectC'),
	url(r'^synergy', 'NCCP.views.projectS', name='projectS'),
	url(r'^sensor', 'NCCP.views.projectSensor', name='projectSensor'),
	url(r'^research', 'NCCP.views.research', name='research'),
	url(r'^equipment', 'NCCP.views.researchE', name='researchE'),
	url(r'^edetails', 'NCCP.views.researchED', name='researchED'),
	url(r'^slist', 'NCCP.views.researchSL', name='researchSL'),
	url(r'^locations', 'NCCP.views.researchL', name='researchL'),
	url(r'^dataresource', 'NCCP.views.dataresource', name='dataresource'),
	url(r'libraries', 'NCCP.views.libraries_default', name='libraries'),
	url(r'publications', 'NCCP.views.libraries_publications', name='publications'),
	url(r'2012', 'NCCP.views.libraries_publications_2012', name='publications_2012'),
	url(r'2011', 'NCCP.views.libraries_publications_2011', name='publications_2011'),
	url(r'2010', 'NCCP.views.libraries_publications_2010', name='publications_2010'),
	url(r'2009', 'NCCP.views.libraries_publications_2009', name='publications_2009'),
	url(r'photos_videos', 'NCCP.views.libraries_photos_videos', name='photos_videos'),
	url(r'tools', 'NCCP.views.tools_default', name='tools'),
	url(r'demeter', 'NCCP.views.tools_demeter', name='demeter'),
	url(r'sunprism', 'NCCP.views.tools_sunprism', name='sunprism'),
	url(r'webmit', 'NCCP.views.tools_webmit', name='webmit'),
	url(r'visted', 'NCCP.views.tools_visted', name='visted'),
	url(r'atmos', 'NCCP.views.tools_atmos', name='atmos'),
	url(r'contact_us', 'NCCP.views.contact_us', name='contact_us'),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
