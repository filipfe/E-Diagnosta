from django.urls import path
from . import views

urlpatterns = [
    path('api/skp/verify', views.SKPVerifyListView.as_view()),
    path('api/skp/verify/action', views.SKPVerifyPostView.as_view()),
    path('api/skp/cities', views.SKPCitiesView.as_view()),
]