from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class AccountManager(BaseUserManager):
    def create_user(self, email, full_name, password=None):
        user = self.model(
            email=email,
            full_name=full_name
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

class Account(AbstractBaseUser):
    objects = AccountManager()

    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=256)

    #Dates
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    #Roles
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'

    def save(self, *args, **kwargs):
        super(Account, self).save(*args, **kwargs)

    def __str__(self):
        return self.email
