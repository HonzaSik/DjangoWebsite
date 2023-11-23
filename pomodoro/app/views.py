from django.http import JsonResponse
from django.shortcuts import render, HttpResponse
from .models import UserStats
from django.views.decorators.csrf import csrf_exempt


def home(request):
    return render(request, "home.html")


def stats_view(request):
    user_stats = UserStats.objects.first()

    # Check if user_stats is None
    if user_stats is None:
        context = {
            'counts': 0,
            'tomatoes': 0,
            'money': '0.00'
        }
    else:
        # Proceed as normal if user_stats is found
        context = {
            'counts': user_stats.number_of_counts,
            'tomatoes': user_stats.number_of_tomatoes,
            'money': user_stats.number_of_money
        }

    return render(request, 'stats.html', context)


def timer_view(request):
    # Your code here
    return render(request, 'timer.html')


def shop_view(request):
    # Your code here
    return render(request, 'shop.html')


def add_coin(request):
    try:
        user_stats = UserStats.objects.first()
        if user_stats:
            user_stats.number_of_money += 1  # Increment by 1 or any other value you consider a coin
            user_stats.save()
            return JsonResponse({"status": "success"})
        else:
            return JsonResponse({"status": "error", "message": "UserStats not found"}, status=404)
    except UserStats.DoesNotExist:
        return JsonResponse({"status": "error", "message": "UserStats not found"}, status=404)


def add_tomato(request):
    try:
        user_stats = UserStats.objects.first()
        if user_stats:
            user_stats.number_of_tomatoes += 1
            user_stats.save()
            return JsonResponse({"status": "success"})
        else:
            return JsonResponse({"status": "error", "message": "UserStats not found"}, status=404)
    except UserStats.DoesNotExist:
        return JsonResponse({"status": "error", "message": "UserStats not found"}, status=404)
