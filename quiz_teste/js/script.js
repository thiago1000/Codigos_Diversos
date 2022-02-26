// Variaveis globais
var tags;
var tagsClass = '';
var liTagsid = [];
var altCorreta = 0;
var quizPagina = 1;
var atualIndex = 0;
var questaoAtual = questoes[atualIndex];
var proxQuestao;
var proxIndex = 0;
var ulTag = document.getElementsByTagName('ul')[0];
var botao = document.getElementById('enviar');
var tituloQuestao = document.getElementById('questao');
var selecionada = 'selected';

//------------------------------------------------------------------
function mostrarQuestao() {

    if (atualIndex != 0) {
        // cria o botão enviar para as próximas paginas
        ulTag.innerHTML = '';
        botao.innerHTML = 'Responder';
        botao.className = 'enviar btn';
        botao.id = 'enviar';
        // Mostra o número da questao
        document.getElementById('quizNumero').innerHTML = quizPagina;
    }

    //Mostra o resultado
    if (atualIndex == (questoes.length)) {
        ulTag.innerHTML = '';
        document.getElementById('questao').innerHTML = '';
        mostrarResultado();
        return
    }

    tituloQuestao.innerHTML = questaoAtual.questao;
    console.log(questaoAtual.questao);

    // cria um loop para gerar as alternativas
    for (var i = 0; i < questaoAtual.respostas.length; i++) {
        // criando respostas
        var novaRes = document.createElement('li');
        novaRes.id = 'ans' + (i + 1);
        novaRes.className = "notSelected";
        var textAns = document.createTextNode(questaoAtual.respostas[i]);
        novaRes.appendChild(textAns);
        var addnovaResHere = document.getElementById('resposta');
        addnovaResHere.appendChild(novaRes);

        console.log(questaoAtual.respostas[i]);
    }

    var $liTags = $('.notSelected').click(function(list) {
        list.preventDefault();
        $liTags.removeClass(selecionada);
        $(this).addClass(selecionada);
        for (var i = 0; i < questaoAtual.respostas.length; i++) {
            if ($liTags[i].className == "notSelected selected") {
                tags = $liTags[i].id;
                console.log(tags);
                tagsClassName = $liTags[i];
            }
        }
    });
    botao.onclick = function() {
        checkResposta()
    };
}
mostrarQuestao();


// Mostra a resposta correta
//------------------------------------------------------------------
function checkResposta() {
    var itemSelecionado = document.getElementById(tags);

    if (itemSelecionado == undefined) {
        alert("Selecione uma resposta");
        console.log(itemSelecionado);
        return
    } else if (itemSelecionado.className == 'notSelected') {
        alert("Selecione uma resposta");
        return
    } else {
        var respostaSelecionada = itemSelecionado.innerHTML;
    }
    if (respostaSelecionada == questaoAtual.respostas[questaoAtual.correta]) {
        console.log("correta! A resposta é: " + respostaSelecionada);
        itemSelecionado.className = 'correta';
        altCorreta++;
        console.log(altCorreta);
    } else {
        console.log("errada! A resposta correta é: " + questaoAtual.respostas[questaoAtual.correta]);
        itemSelecionado.className = 'errada';
        ulTag.getElementsByTagName('li')[questaoAtual.correta].className = 'correta';
        console.log(questaoAtual.respostas[questaoAtual.correta]);
    }

    // Cria o botão para a proxima pergunta
    botao.innerHTML = 'Próxima Pergunta';
    botao.className = 'next btn';
    botao.id = 'next';

    proxQuestao = questaoAtual;
    quizPagina++;
    atualIndex++;
    questaoAtual = questoes[atualIndex];

    botao.onclick = function() {
        mostrarQuestao()
    };
    return
}

// Pontuação
//------------------------------------------------------------------
function mostrarResultado() {
    // deleta a numeração
    document.getElementById('pages').innerHTML = '';

    // mudar titulo da pontuação
    tituloQuestao.innerHTML = '<h1>Sua pontuação foi:</h1>';

    // gera a pontuação
    var novaInfo = document.getElementById('quiz-resultados');
    novaInfo.innerHTML = '';
    novaInfo.id = 'circle';
    novaInfo.className = 'circle';

    // cria as divs com os resultados(posso mudar o layout conforme for solicitado)
    var novaDiv = document.createElement('div');
    novaDiv.className = 'fill';
    var add = document.getElementById('circle');
    add.appendChild(novaDiv);

    // adiciona a pontuação
    var newScore = document.createElement('h3');
    newScore.className = 'score';
    var textScore = document.createTextNode(Math.floor((altCorreta / questoes.length) * 100) + '%');
    newScore.appendChild(textScore);
    add.appendChild(newScore);

    var score = $(".score").text();

    // preenche a div conforme a pontuação(opcional)
    $(".fill").css("height", score);

    if (altCorreta >= 5) {
        var newCongrats = document.createElement('p');
        var textCongrats = document.createTextNode('Parabéns!')
        newCongrats.appendChild(textCongrats);
        document.getElementById('display-area').appendChild(newCongrats);
        // confettiEffect();
    } 
}