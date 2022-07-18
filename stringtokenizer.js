function strtok(texto, separadores) {
	const tokens = [];
	let palavra = "";
	let achou = false;

	for (let i = 0; i < texto.length; i++) {
		for (let j = 0; j < separadores.length; j++) {
			if (texto[i] == separadores[j]) {
				achou = true;
				break;
			}
		}

		if (!achou) {
			palavra += texto[i];
		} else if(achou) {
			tokens.push(palavra);
			palavra = "";
			achou = false;
		}
	}

	tokens.push(palavra);

	return tokens;
}