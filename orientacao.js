/*Classe que configura a janela para executar funções de acordo com sua orientação*/
function Orientacao(funcao_retrato, funcao_paisagem) {
	window.addEventListener('resize', this.ajustarOrientacao);
	this.port_func = [funcao_port];
	this.land_func = [funcao_land];
}

Orientacao.prototype.novaFuncaoRetrato = function(funcao) {
	this.port_func.push(funcao);	
}

Orientacao.prototype.novaFuncaoPaisagem = function() {
	this.land_func.push(funcao);	
}

Orientacao.prototype.ajustarOrientacao = function() {
	if (window.innerWidth < window.innerHeight) { // modo retrato
		for (var i in this.port_func) {
			this.port_func[i]();
		}
	} else { // modo paisagem
		for (var i in this.port_land) {
			this.port_land[i]();
		}
	}	
}