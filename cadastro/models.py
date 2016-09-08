from django.db import models
from django.forms import ModelForm


# Create your models here.
class Bicicleta(models.Model):
    fabricante = models.CharField(max_length=255)
    modelo = models.CharField(max_length=255)
    cor = models.CharField(max_length=255)
    marcha = models.CharField(max_length=255)
    marca_cambio = models.CharField(max_length=255)
    proprietario = models.CharField(max_length=255)
    celular = models.CharField(max_length=255)
    email = models.CharField(max_length=255)


class BicicletaForm(ModelForm):
    class Meta:
        model = Bicicleta
        fields = [
            'fabricante',
            'modelo',
            'cor',
            'marcha',
            'marca_cambio',
            'proprietario',
            'celular',
            'email'
        ]