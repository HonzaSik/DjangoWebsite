from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('stats/', views.stats_view, name='stats'),
    path('timer/', views.timer_view, name='timer'),  # Assuming you have a timer_view in views.py
    path('shop/', views.shop_view, name='shop'),     # Assuming you have a shop_view in views.py
    path('add_coin/', views.add_coin, name='add_coin'),
    path('add_tomato/', views.add_tomato, name='add_tomato'),
]
