//Variáveis
var video = document.getElementById('video_ctrl');
var barra = document.getElementById('barra');
var duration = document.getElementById("duration");
var currenttime = document.getElementById("currenttime");

// Função para criar os botões play/pause para o video	
function videoplay() {
	var button = document.getElementById("play");
	if (video.paused) {
		video.play();
		button.textContent = "||";
	} else {
		video.pause();
		button.textContent = ">";
	}
}  
//Play/pause ao clicar na tela
// $(video).click(function() {
// 	if (video.paused) {
// 		video.play();
// 	} else {
// 		video.pause();
// 	}
// });

//Função para a barra de progresso seguir o tempo do video
video.addEventListener('timeupdate', function (event) {
	var position = this.currentTime / this.duration;
	barra.value = position * 100;
	console.log(position.currentTime);
});

//Função para aparecer a duração do video dinamicamente
video.addEventListener("timeupdate",function(){currenttime.innerHTML = convertTime(video.currentTime);},false);

video.addEventListener("loadedmetadata",function(){duration.innerHTML = convertTime2(video.duration);},false);

function convertTime(org){
	var minute = Math.floor(org/60) % 60;
	var second = Math.floor(org%60);
	if(second <= 9 ){
		second = "0" + second;
	}
	if(minute <= 9 ){
		minute = "0" + minute;
	}
	return(minute + ":" + second);
}
function convertTime2(org){
	var minute = Math.floor(org/60) % 60;
	var second = Math.floor(org%60);
	if(second <= 9 ){
		second = "0" + second;
	}
	if(minute <= 9 ){
		minute = "0" + minute;
	}
	return("/" + minute + ":" + second);
}

//Indica um evento ao final da exibição do video
$(video).on('ended', function() {
	//alert ('funcionou !!!!!');
	$(".aparecer").fadeIn('slow');
	// $('.aparecer').css('display', 'initial');
});

//Função para fechar o menu ao apertar em fechar
$('.fechar').click(function(){
	if($( '#navicon' ).prop( "checked" ) == true){
  		$( '#navicon' ).prop( "checked" , false)
	} else {
		$( '#navicon' ).prop( "checked" , true)
	}
});

// Array com as respostas corretas
	var respostas = [
    "Apenas faço minhas vendas e encontros", "1"
	];

	// Função para verificar se a resposta do input radio está correta
	function calcular_resultado() {
    	var resultado = {certa: 0, errada: 0, respondidas: [], semrespostas: [], perdeu: []};
    	console.log(resultado);
	    $("form .opcoes").each(function(index) {
	        var check = $(this).find("input:checked");
	        if (check.length) {
	            resultado.respondidas.push(index);
	            if (check.val() == respostas[(index * 2) + 1]) {
	                resultado.certa++;
	                resultado.respondidas.push(index);
	                console.log(respostas[(index * 2) + 1]);
	            } else {
	                resultado.errada++;
	                resultado.perdeu.push(index);
	                console.log(index);
	            }
	        } else {
	            resultado.semrespostas.push(index);
	        }
	    });
    	return(resultado);
	}

	// Ao finalizar o questionário pego as resposta corretas e imprimo na tela a quantidade de certas e erradas
	$("#finalizar").click(function() {
	    var results = calcular_resultado();
	    var str = "Corretas: " + results.certa + ", Erradas: " + results.errada + ", Sem resposta: " + results.semrespostas.length;
	    $("#resultados").html(str);
	});
