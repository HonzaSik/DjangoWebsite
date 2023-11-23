from django.db import models

# Create your models here.


class UserStats(models.Model):
    # number_of_tomatoes user have
    number_of_tomatoes = models.IntegerField(default=0)
    # number_of_money user have is decimal because of correct money format and calculations with money
    number_of_money = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    # number_of_counts user already completed
    number_of_counts = models.IntegerField(default=0)

    def __str__(self):
        return f"Stats({self.number_of_tomatoes}, {self.number_of_money}, {self.number_of_counts})"

