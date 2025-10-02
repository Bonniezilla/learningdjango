from django.shortcuts import render
from .serializers import ProductSerializer
from .models import Product
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ProductFilter

# Create your views here.

def index(request):
    return render(request, 'index.html')

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer 

    # Filters
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['price', 'name']
    filterset_class = ProductFilter
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at']
    ordering = ['id']