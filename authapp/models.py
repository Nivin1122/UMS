from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
# class CustomUser(AbstractUser):
#     groups = models.ManyToManyField(
#         'auth.Group',
#         related_name='customuser_set', 
#         blank=True
#     )
#     user_permissions = models.ManyToManyField(
#         'auth.Permission',
#         related_name='customuser_permissions', 
#         blank=True
#     )