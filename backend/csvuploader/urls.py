
from django.contrib import admin
from django.urls import path
from people.views import upload_csv, people_list_api, export_csv

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', upload_csv, name='upload_csv'),
    path('people/', people_list_api, name='people_list_api'),
    path('export/', export_csv, name='export_csv'),
]
