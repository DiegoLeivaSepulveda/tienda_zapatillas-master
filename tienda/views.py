from django.shortcuts import render
from .models import Producto

def index(request):
    productos = Producto.objects.all()
    return render(request, 'index.html', {'productos': productos})

def producto_detalle(request, producto_id):
    producto = Producto.objects.get(pk=producto_id)
    return render(request, 'producto.html', {'producto': producto})

def carrito(request):
    # Lógica para manejar el carrito de compras aquí
    return render(request, 'carrito.html')
