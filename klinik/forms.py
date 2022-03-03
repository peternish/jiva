from django import forms
from .models import *

class KlinikForm(forms.Form):
    name = forms.CharField()
    sik = forms.FileField()