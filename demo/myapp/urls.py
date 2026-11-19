from django.urls import path
from . import views

urlpatterns = [
    path('', views.loading, name='loading'),
    path('index/', views.index, name='index'),
    path('home/', views.home, name='home'),
    path('galerie/', views.galerie, name='galerie'),
    path('bootstrap-gallery/', views.bootstrap_gallery, name='bootstrap_gallery'),
    path('universities/', views.universities, name='universities'),
    path('chatbot/', views.chatbot, name='chatbot'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
]