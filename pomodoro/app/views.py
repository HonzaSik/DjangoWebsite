from django.shortcuts import render, HttpResponse


def home(request):
    return render(request, "home.html")


def stats_view(request):
    context = {
        'total_completed': 10,  # Example data
        'time_focused': '5 hours',
        'time_paused': '1 hour',
        'tomatoes': 50,
        'money': '$25'
    }
    return render(request, 'stats.html', context)


def timer_view(request):
    # Your code here
    return render(request, 'timer.html')


def shop_view(request):
    # Your code here
    return render(request, 'shop.html')
