from django.http import HttpResponseRedirect
from django.shortcuts import render
from cadastro.models import Bicicleta


# Create your views here.
def cadastro(request):
    return render(request, 'cadastro/cadastro.html')


def editar(request, id_retrieved):
    item = Bicicleta.objects.get(pk=id_retrieved)
    context = {
        'item': item,
        'id': id_retrieved,
    }
    return render(request, 'cadastro/cadastro.html', context=context)


def cadastrar(request):
    post = request.POST
    id_retrieved = post.get('id', '')

    if id_retrieved != '':
        form = Bicicleta.objects.get(pk=id_retrieved)
    else:
        form = Bicicleta()

    form.fabricante = post.get('fabricante', '')
    form.modelo = post.get('modelo', '')
    form.cor = post.get('cor', '')
    form.marcha = post.get('possuiMarcha', '')
    form.marca_cambio = post.get('marca_cambio', '')
    form.proprietario = post.get('proprietario', '')
    form.celular = post.get('celular', '')
    form.email = post.get('email', '')
    form.save()

    return HttpResponseRedirect('/cadastro/consulta')


def consulta(request):
    procurar_por = request.POST.get('procurar_por')

    if procurar_por == '' or procurar_por is None:
        itens = Bicicleta.objects.all()
    else:
        itens = Bicicleta.objects.filter(fabricante=procurar_por)
        if len(itens) == 0:
            itens = Bicicleta.objects.filter(modelo=procurar_por)
        if len(itens) == 0:
            itens = Bicicleta.objects.filter(cor=procurar_por)
        if len(itens) == 0:
            itens = Bicicleta.objects.filter(marca_cambio=procurar_por)
        if len(itens) == 0:
            itens = Bicicleta.objects.filter(proprietario=procurar_por)
        if len(itens) == 0:
            itens = Bicicleta.objects.filter(celular=procurar_por)
        if len(itens) == 0:
            itens = Bicicleta.objects.filter(email=procurar_por)

    context = {
        'itens': itens,
    }
    return render(request, 'consulta/consulta.html', context=context)


def excluir(request, id_retrieved):
    Bicicleta.objects.get(pk=id_retrieved).delete()
    return HttpResponseRedirect('/cadastro/consulta')