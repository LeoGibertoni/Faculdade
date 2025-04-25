var perguntas = [
    "Qual o propósito da linguagem HTML?",
    "Qual o propósito da linguagem JavaScript?",
    "O que são funções e como elas são definidas na linguagem JavaScript?"
];

var respostas = [
    "Para criar a interface do site (Exemplo: a planta de uma casa).",
    "JavaScript é responsável por criar a interação do site web!",
    "Função é uma ação que será chamada quando interagir ou chamá-la. (Exemplo: clicar em um botão)"
];

var indexAtual = 0;
var mostrandoResposta = false;
var historicoRespostas = [];
var att = 1;
var perguntaElemento = document.getElementById('pergunta');
var btnMostrar = document.getElementById('btn');
var btnVoltar = document.getElementById('voltar');
var btnAvancar = document.getElementById('avancar');
var listaRespostas = document.getElementById('listaRespostas');
var porcentoElemento = document.getElementById('porcento1');
var etapa1 = document.getElementById('etapa1');
var etapa2 = document.getElementById('etapa2');

function atualizarPergunta() {
    if (mostrandoResposta) {
        perguntaElemento.textContent = respostas[indexAtual];
        btnMostrar.textContent = "Mostrar pergunta";
    } else {
        perguntaElemento.textContent = perguntas[indexAtual];
        btnMostrar.textContent = "Mostrar resposta";
    }

    // Atualiza a barra de progresso e etapas
    if (indexAtual === 0) {
        porcentoElemento.style.width = "20%";
        etapa1.textContent = "33%";
        etapa2.textContent = "1 de 3";
    } else if (indexAtual === 1) {
        porcentoElemento.style.width = "44%";
        etapa1.textContent = "66%";
        etapa2.textContent = "2 de 3";
    } else if (indexAtual === 2) {
        porcentoElemento.style.width = "70%";
        etapa1.textContent = "100%";
        etapa2.textContent = "3 de 3";
    }
}

function atualizarHistorico() {
    listaRespostas.innerHTML = "";
    for (var i = 0; i < historicoRespostas.length; i++) {
        var li = document.createElement("li");
        li.textContent = historicoRespostas[i];
        listaRespostas.appendChild(li);
    }
}

btnMostrar.onclick = function () {
    mostrandoResposta = !mostrandoResposta;

    if (mostrandoResposta) {
        historicoRespostas.push(respostas[indexAtual]);
        atualizarHistorico();
    }

    atualizarPergunta();
};

btnVoltar.onclick = function () {
    if (indexAtual > 0) {
        indexAtual--;
        mostrandoResposta = false;
        atualizarPergunta();
    }
};

btnAvancar.onclick = function () {
    if (indexAtual < perguntas.length - 1) {
        indexAtual++;
        mostrandoResposta = false;
        atualizarPergunta();
    }
};

function limpar() {
    historicoRespostas = [];
    atualizarHistorico();
}

atualizarPergunta();
