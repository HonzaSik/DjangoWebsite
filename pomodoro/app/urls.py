from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('stats/', views.stats_view, name='stats'),
    path('timer/', views.timer_view, name='timer'),  # Assuming you have a timer_view in views.py
    path('shop/', views.shop_view, name='shop'),     # Assuming you have a shop_view in views.py
    # ... other url patterns ...
]
