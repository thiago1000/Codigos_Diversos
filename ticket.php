
<?php
function generateTicket($tamanho, $maiusculas, $numeros, $simbolos){
	//Caractere de cada tipo
	$lmin = 'abcdefghijklmnopqrstuvwxyz';
	$lmai = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$num = '1234567890';
	$simb = '!@#$%*-';

	//Variáveis internas
	$return = '';
	$caracter ='';

	//Caracteres que podem ser utlizados
	$caracter .= $lmin;
	if ($maiusculas){ 
		$caracter .= $lmai;
	}
	if ($numeros){ 
		$caracter .= $num;
	}
	if ($simbolos){ 
		$caracter .= $simb;
	}

	// Caracteres possiveis
	$len = strlen($caracter);

	for ($n = 1; $n <= $tamanho; $n++) {
		//número aleatório de 1 até $len para pegar um dos caracteres
		$rand = mt_rand(1, $len);
		$return .= $caracter[$rand-1];
	}
	return $return;
}	
	
	//Exemplo de uso
	$key = generateTicket(40, true, true, true);
	echo $key;

?>