from django.contrib import admin
from django.urls import path, re_path
from charts import views as cview
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/charts/(\d+)$', cview.list_charts),
    re_path(r'^api/charts/(\d+)/download$', cview.download_chart),
    re_path(r'^api/settings/$', cview.settings),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
