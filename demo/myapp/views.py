from django.shortcuts import render

def loading(request):
    return render(request, "loading.html")

def index(request):
    return render(request, "index.html")

def home(request):
    return render(request, "home.html")

def galerie(request):
    return render(request, "galerie.html")

def bootstrap_gallery(request):
    return render(request, "bootstrap-gallery.html")

def universities(request):
    return render(request, "universities.html")

def chatbot(request):
    return render(request, "chatbot.html")

def login(request):
    return render(request, "login.html")

def register(request):
    return render(request, "register.html")