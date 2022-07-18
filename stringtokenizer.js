function StringTokenizer(string, separadores) {
	this.string = string;
	this.letras = string.split('');
	this.separadores = separadores;
	this.tokens = [];
	this.sortTokens = this.tokens.sort();
	this.criarTokens();
}

StringTokenizer.prototype = {
	criarTokens: function() {
		var str = this.string;
		var sep = this.separadores;	
		var letras = this.letras;
		var mark = 0;
		
		for (var i = 0; i < str.length; i++) {
			for (var j = 0; j < sep.length; j++) {
				if (letras[i] == sep.charAt(j)) {
					letras[i] = '\0';
					mark++;
				}
			}
		}
		
		var token = '';
		j = 0;
		
		for (var i = 0; i <= mark; i++) {
			for (; j < str.length; j++) {
				if (letras[j] !=  '\0') {
					token += letras[j];
				} else break;
			}
			if (token != '') {
				this.tokens.push(token);
			}
			token = '';
			j++;
		}
	}
}