/**
    ######### Validation Form #########

    Developed by: Jeferson Lima
    Version: 1.0
    License: MIT

    Description: Trabalho de Laboratório de Programação WEB
**/

/* Elementos da página */
/*
// Elementos do Dependente
var domNomeDependente       = $("#nomeDependenteInput");
var domCPFDependente        = $("#cpfDependenteInput");
var domNascimentoDependente = $("#dataNascimentoDependenteInput");
var domTelefoneDependente   = $("#telefoneDependenteInput");
var domCelularDependente    = $("#celularDependenteInput");
var domEnderecoDependente   = $("#enderecoDependenteInput");

// Elementos do Responsavel
var domNomeResponsavel      = $("#nomeResponsavelInput");
var domCPFResponsavel       = $("#cpfResponsavelInput");
var domTelefoneResponsavel  = $("#telefoneResponsavelInput");
var domCelularResponsavel   = $("#celularResponsavelInput");
var domEnderecoResponsavel  = $("#enderecoResponsavelInput");
*/

/*
OK - Fabricante *           nomeFabricanteBicicletaInput
OK - Modelo *               modeloBicicletaInput
OK - Cor *                  corBicicletaInput
OK - Marcha (sim ou não)    possuiMarcha
OK - Marca do Cambio        marcaCambioInput
OK - Proprietário *         nomeProprietarioInput
OK - Celular *              celularProprietarioInput
OK - e-mail                 emailProprietarioInput
*/

// Elementos Bicicleta
var domNomeFabricanteBicicleta  = $("#nomeFabricanteBicicletaInput");
var domModeloBicicleta          = $("#modeloBicicletaInput");
var domCorBicicleta             = $("#corBicicletaInput");
var domNomeProprietario         = $("#nomeProprietarioInput");
var domCelularProprietario      = $("#celularProprietarioInput")

// Botao Resultado
var botaoResultao           = $("#botaoValidacao");

// Mascaras globais
var mascaraTelefone         = "(00) 0000-0000";
var mascaraCelular          = "(00) 0 0000-0000";
var mascaraCPF              = "000.000.000-00";
var mascaraDataNascimento   = "00/00/0000";

/* Validar digitos do CPF
   fonte: http://www.geradorcpf.com/javascript-validar-cpf.htm */
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf === '') return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999")
            return false;
    // Valida 1o digito
    add = 0;
    for (i=0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11)
            rev = 0;
        if (rev !== parseInt(cpf.charAt(9)))
            return false;
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
        rev = 0;
    if (rev !== parseInt(cpf.charAt(10)))
        return false;
    return true;
}

function validarData(str){
    var t = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    // Se a data não estiver completa retorna falso
    if(t === null){
        return false;
    }

    var d =+ t[1], m =+ t[2], y =+ t[3];

    //below should be more acurate algorithm
    if(m>=1 && m<=12 && d>=1 && d<=31){
        return true;
    }
    return false;
}

function validarNaoVazio(entrada){
    // Verifica a string estiver vazia ou só conter espaços em branco
    return (entrada !== null) && (entrada.length !== 0) && (entrada.replace(/\ /g, "").length !== 0);
}

function validarTelefone(entrada){
    // Verifica se string não está vazia e tem o tamanho correto
    return (entrada !== null) && (entrada.length === 14);
}

function validarCelular(entrada){
    // Verifica se string não está vazia e tem o tamanho correto
    return (entrada !== null) && (entrada.length === 16);
}

/*
    Valida um conjunto de objetos de validação.
    @param  obj Objeto de validação, deve ser um vetor no formato
                [{var: dom, validation: functionValidate}, ...]
    @return retorna um vetor com os dom não validados, um vetor vazio
            significa que todos os dados foram validados
*/
function validateForm(obj){
    var domErrado = [];
    var domCorreto = [];
    for(var i = 0; i < obj.length; i++){
        if(obj[i].validation(obj[i].variable.val())){
            domCorreto.push(obj[i].variable);
        }
        else{
            domErrado.push(obj[i].variable);
        }
    }
    return {
        erro: domErrado,
        success: domCorreto
    };
}

/*
domNomeFabricanteBicicleta
domModeloBicicleta
domCorBicicleta
domNomeProprietario
domCelularProprietario
*/

// Formulario de Validação
var formularioValidacao = [
    {
        variable:   domNomeFabricanteBicicleta,
        validation: validarNaoVazio
    },
    {
        variable:   domModeloBicicleta,
        validation: validarNaoVazio
    },
    {
        variable:   domCorBicicleta,
        validation: validarNaoVazio
    },
    {
        variable:   domNomeProprietario,
        validation: validarNaoVazio
    },
    {
        variable:   domCelularProprietario,
        validation: validarCelular
    }
];

// Valida o formulário e colore o mesmo
function validarForm(){
    var domValidado = validateForm(formularioValidacao);

    // Na primeira execução
    botaoResultao.removeClass("btn-primary");

    // Colore o elementos corretos
    for(var i = 0; i < domValidado.success.length; i++){
        domValidado.success[i].parent().removeClass("has-nothing").removeClass("has-error").addClass("has-success");
    }

    if(domValidado.erro.length === 0){
        // Muda o estilo e a mensagem do botão
        botaoResultao.removeClass("btn-danger").addClass("btn-success");
        //botaoResultao[0].disabled = false;
        botaoResultao[0].innerHTML = "- Salvar! - ";

        // Retorna o sucesso
        return true;
    }

    // Colore os elementos incorretos
    for(var i = 0; i < domValidado.erro.length; i++){
        domValidado.erro[i].parent().removeClass("has-nothing").removeClass("has-success").addClass("has-error");
    }

    // Muda o estilo e a mensagem do botão
    botaoResultao.removeClass("btn-success").addClass("btn-danger");
    //botaoResultao[0].disabled = true;
    botaoResultao[0].innerHTML = "- Contém Erros! - ";

    // Retorna o erro
    return false;
}

// Aplica Mascaras e valida o formulário
$(document).ready(function(){
    // Mascaras
    domCelularProprietario.mask(mascaraCelular);
    //domTelefoneDependente.mask(mascaraTelefone);
    //domTelefoneResponsavel.mask(mascaraTelefone);
    //domCelularResponsavel.mask(mascaraCelular);
    //domCPFDependente.mask(mascaraCPF);
    //domCPFResponsavel.mask(mascaraCPF);
    //domNascimentoDependente.mask(mascaraDataNascimento);

    // Valida Formulário
    //validarForm();
});
