# -*- coding: utf-8 -*-
from django.conf.urls import url
from cadastro import views


urlpatterns = [
    url(r'^cadastro', views.cadastro, name='cadastro'),
    url(r'^cadastrar', views.cadastrar, name='cadastrar'),
    url(r'^consulta', views.consulta, name='consulta'),
    url(r'^editar/([0-9]*)/$', views.editar, name='editar'),
    url(r'^excluir/([0-9]*)/$', views.excluir, name='excluir'),
]