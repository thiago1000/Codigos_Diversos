
var currentTab = 0;
showTab(currentTab);

//Navegação =====

	function showTab(n) {
		var x = document.getElementsByClassName("tab");
			x[n].style.display = "block";

		if (n == 0) {
			document.getElementById("prevBtn").style.display = "none";
		} else {
			document.getElementById("prevBtn").style.display = "inline";
			}
			if (n == (x.length - 1)) {
			//document.getElementById("nextBtn").innerHTML = "Ver dados";
			//$('.botao').html('<a href="#janela1" rel="modal">Ver dados</a>');
			$('#nextBtn').css('display', 'none');
			$('.btnModal').css('display','block');
			} else {
			document.getElementById("nextBtn").innerHTML = "Próximo";
			}

			fixStepIndicator(n)
	}

	function nextPrev(n) {
			var x = document.getElementsByClassName("tab");

			if (n == 1 && !validateForm()) return false;

			x[currentTab].style.display = "none";

			currentTab = currentTab + n;

			if (currentTab >= x.length) {
			document.getElementById("regForm").submit();
			return false;
			}
		showTab(currentTab);
	}

	//Validando
	function validateForm() {
		var x, y, i, valid = true;
	  	x = document.getElementsByClassName("tab");
	  	y = x[currentTab].getElementsByTagName("input");
		for (i = 0; i < y.length; i++) {
			if (y[i].value == "") {
				y[i].className += " invalid";
				valid = false;
	 		}
	  	}
	  	if (valid) {
	    	document.getElementsByClassName("step")[currentTab].className += " finish";
	  	}
			return valid; 
	}
	//Progresso do formulário
	function fixStepIndicator(n) {
		var i, x = document.getElementsByClassName("step");
			for (i = 0; i < x.length; i++) {
			x[i].className = x[i].className.replace(" active", "");
			}
		x[n].className += " active";
	}

//EstadosxCidades =====

	//Inicial - Chama cidades e estados consultando um arquivo json
	$(document).ready(function () {		
		$.getJSON('estados_cidades.json', function (data) {
			var items = [];
			var options = '<option value="">escolha um estado</option>';	
			$.each(data, function (key, val) {
				options += '<option value="' + val.nome + '">' + val.nome + '</option>';
			});					
			$("#estados").html(options);				
			$("#estados").change(function () {				
				var options_cidades = '';
				var str = "";					
				$("#estados option:selected").each(function () {
					str += $(this).text();
				});
				$.each(data, function (key, val) {
					if(val.nome == str) {							
						$.each(val.cidades, function (key_city, val_city) {
							options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
						});							
					}
				});
				$("#cidades").html(options_cidades);				
			}).change();				
		});	
	});

	//Adiciona Mais
	$(function () {
	    $("#addCidade").bind("click", function (e) {
	    	e.preventDefault();
	        var index = $("#adicionar select").length + 1;
	        //clonar a lista
	        var ddl = $("#cidades").clone();
	        ddl.attr("id", "cidades" + index);
	        ddl.attr("name", "cidades[]" + index);

	        $("#cidades" + index).change(function(event) {
				valorCidade = $("#cidades"+index+ "option:selected").val();
				console.log(valorCidade);
				$('.escolha').append(valorCidade);
			});
	        //[Opcional] Copia os valores selecionados
	        var selectedValue = $("#cidades option:selected").val();
	        ddl.find("option[value = '" + selectedValue + "']").attr("selected", "selected");
			$("#adicionar").append("</br>");
	        $("#adicionar").append(ddl);
	            
	    });
	});

//Banco de Dados (Valores) =====

	//Pegando os valores dos inputs e selects
	var valorDistrito;
	var valorDistribuicao;
	var valorEmpresaria;
	var valorCidade;
	$("input").blur(function(){
		valorDistrito = $('#distrito').val();
		valorDistribuicao = $('#distribuicao').val();
		valorEmpresaria = $('#empresaria').val();
		console.log(valorDistrito,valorDistribuicao,valorEmpresaria);
		
	});

	$("select").change(function(event) {
		valorCidade = $("#cidades option:selected").val();
		console.log(valorCidade);
		$('.escolha').append(valorCidade);
	});

//Arrumar =====

	//Função para calcular oportunidade de recrutamento e nomeação
	// function calcular() {
	//   	var n1 = parseInt(document.getElementById('n1').value, 10);
	//   	var n2 = parseInt(document.getElementById('n2').value, 10);
	//   	var n3 = parseInt(document.getElementById('n3').value, 10);
	//   	var n4 = parseInt(document.getElementById('n4').value, 10);
	//   	var n5 = parseInt(document.getElementById('n5').value, 10);
	//   	var n6 = parseInt(document.getElementById('n6').value, 10);
	//   	var n7 = parseInt(document.getElementById('n7').value, 10);
	//   	var n8 = parseInt(document.getElementById('n8').value, 10);
	//   	var n9 = parseInt(document.getElementById('n9').value, 10);
	//   	var n10 = parseInt(document.getElementById('n10').value, 10);
	//   	var n11= parseInt(document.getElementById('n11').value, 10);
	//   	var resultado = n1 / n2;

	//   	if (resultado > 100) {
	//   		console.log('deu certo');
	//   		document.getElementById('resultado').innerHTML = "Oportunidade de recrutamento";
	//   	}else if (resultado > 40 && resultado < 99) {
	// 	  	console.log('deu certo 2');
	// 	  	document.getElementById('resultado').innerHTML = "Oportunidade de nomeação"; 
	//   	}else{
	//   		console.log('Erro');
	//   	}

	//   	if (n3 >= 8) {
	//   		console.log('deu certo');
	//   		$('.recruta').html('<i class="greenico icofont icofont-verification-check">');
	//   	}else {
	//   		console.log('não deu certo');
	//   		$('.recruta').html('<i class="redico icofont icofont-close"></i>');
	//   	}
	//   	if (n4 >= 8) {
	//   		console.log('deu certo');
	//   		$('.recruta').html('<i class="greenico icofont icofont-verification-check">');
	//   	}else {
	//   		console.log('não deu certo');
	//   		$('.recruta').html('<i class="redico icofont icofont-close"></i>');
	//   	}
	//   	if (n5 >= 8) {
	//   		console.log('deu certo');
	//   		$('.recruta').html('<i class="greenico icofont icofont-verification-check">');
	//   	}else {
	//   		console.log('não deu certo');
	//   		$('.recruta').html('<i class="redico icofont icofont-close"></i>');
	//   	}
	//   	if (n6 >= 8) {
	//   		console.log('deu certo');
	//   		$('.recruta').html('<i class="greenico icofont icofont-verification-check">');
	//   	}else {
	//   		console.log('não deu certo');
	//   		$('.recruta').html('<i class="redico icofont icofont-close"></i>');
	//   	}

	//   	if (n7 >= 8) {
	//   		console.log('deu certo');
	//   		$('.recruta').html('<i class="greenico icofont icofont-verification-check">');
	//   	}else {
	//   		console.log('não deu certo');
	//   		$('.recruta').html('<i class="redico icofont icofont-close"></i>');
	//   	}

	//   	if (n8 >= 8) {
	//   		console.log('deu certo');
	//   		$('.recruta').html('<i class="greenico icofont icofont-verification-check">');
	//   	}else {
	//   		console.log('não deu certo');
	//   		$('.recruta').html('<i class="redico icofont icofont-close"></i>');
	//   	}

	//   	if (n9 >= 4640) {
	//   		console.log('deu certo');
	//   		$('.vendas').html('<i class="greenico icofont icofont-verification-check">');
	//   	}else{
	//   		console.log('não deu certo');
	//   		$('.vendas').html('<i class="redico icofont icofont-close"></i>');
	// 	}
	// }

// Modal =====

	$("a[rel=modal]").click( function(ev){
	    ev.preventDefault();

	    var id = $(this).attr("href");

	    var alturaTela = $(document).height();
	    var larguraTela = $(window).width();
	 
	    //colocando o fundo preto
	    $('#mascara').css({'width':larguraTela,'height':alturaTela});
	    $('#mascara').fadeIn(1000); 
	    $('#mascara').fadeTo("slow",0.8);

	    //var left = ($(window).width() /2) - ( $(id).width() / 2 );
	    //var top = ($(window).height() / 2) - ( $(id).height() / 2 );
	 
	    //$(id).css({'top':top,'left':left});
	    $(id).show();   
	});

	$("#mascara").click( function(){
	    $(this).hide();
	    $(".window").hide();
	});

	$('.fechar').click(function(ev){
	    ev.preventDefault();
	    $("#mascara").hide();
	    $(".window").hide();
	});

	//Imprimir dados preenchidos
	$(document).ready(function(){
	    $(".btnModal").click(function(){
	        var x = $("form").serializeArray();
	        $.each(x, function(i, field){
	            $("#janela1").append("<p>"+ field.name + ":" + field.value + " " + "</p>");
	        });
	    });
	});

//Salvar em PDF =====

	function imprimir() {
		window.print();
	}