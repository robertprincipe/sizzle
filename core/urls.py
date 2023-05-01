from django.urls import path, re_path
from django.views.generic import TemplateView
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/', include('apps.blog.urls')),
    path('api/users/', include('apps.user.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
