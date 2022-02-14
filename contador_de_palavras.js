const REGEX = /[. ,():;\n\t]/;

function Contador(texto) {
	this.texto = (texto != '') ? texto : '';
	this.palavras = {};
}

Contador.prototype.novoTexto = function(texto) {
	this.texto = texto;
}

Contador.prototype.contarPalavras = function() {
	var split = this.texto.split(REGEX);
	
	for (palavra in split) {
		if (this.palavras[palavra] == null) {
			this.palavras[palavra] = 1;
		} else {
			this.palavras[palavra]++;
		}		
	}
}