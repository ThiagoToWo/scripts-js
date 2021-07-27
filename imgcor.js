/*Classe que captura e analiza as cores dos pixels de uma imagem*/
function ImgCor(context, largura, altura) {
	this.ctx = context; // contexto onde tem a imagem
	this.w = largura;
	this.h = altura;
	this.img = context.getImageData(0, 0, this.w, this.h);
	this.pixels = this.w * this.h; // total de pixels
	// objetod de dados
	this.coresHexa = {}; // {0xrrggbb: frequência, ...}
	this.coresRGB = {}; // {rgb(r,g,b): frequência, ...}
	this.corMedia = {}; // {rgb: rgb(r,g,b), rgbArray: [r,g,b], hexa: 0xrrggbb}
	this.corMax = {}; // {rgb: [rgb(r,g,b), frequência], hexa: [0xrrggbb, frequência]}
	this.corProxima = {} // {rgb: rgb(r,g,b), rgbArray: [r,g,b], hexa: 0xrrggbb, nome:...}
}

ImgCor.PRETO = [0,0,0,'preto'];
ImgCor.MARINHO = [0,0,128,'azul marinho'];
ImgCor.AZUL = [0,0,255,'azul'];
ImgCor.VERDE = [0,128,0,'verde'];	
ImgCor.PETROLEO = [0,128,128,'azul petróleo'];
ImgCor.DODGER = [0,128,255,'azul dodger'];	
ImgCor.LIMA = [0,255,0,'lima'];
ImgCor.PRIMAVERA = [0,255,128,'verde primavera'];
ImgCor.AQUA = [0,255,255,'aqua'];
ImgCor.VINHO = [128,0,0,'vinho'];
ImgCor.ROXO = [128,0,128,'roxo'];
ImgCor.INDIGO = [128,0,255,'índigo elétrico'];
ImgCor.OLIVA = [128,128,0,'verde oliva'];
ImgCor.CINZA = [128,128,128,'cinza'];
ImgCor.ARDOSIA = [128,128,255,'azul ardósia claro'];
ImgCor.VERDE_CHOQUE = [128,255,0,'verde choque'];
ImgCor.VERDE_CLARO = [128,255,128,'verde claro'];
ImgCor.AZUL_ELETRICO = [128,255,255,'azul elétrico'];	
ImgCor.VERMELHO = [255,0,0,'vermelho'];
ImgCor.ROSA_CHOQUE = [255,0,128,'rosa choque'];
ImgCor.MAGENTA = [255,0,255,'magenta'];
ImgCor.LARANJA_ESCURO = [255,128,0,'laranja escuro'];
ImgCor.CORAL_ESCURO = [255,128,128,'coral escuro'];
ImgCor.ROSA_FUCSIA = [255,128,255,'rosa fúcsia'];
ImgCor.AMARELO = [255,255,0,'amarelo'];
ImgCor.HAMAMELIA = [255,255,128,'Hamamélia'];
ImgCor.BRANCO = [255,255,255,'branco'];

ImgCor.prototype.processar = function() { // preenche todos os objetos de dados
	var i; // índice do array data
	var r; // componete vermelho rgb em data
	var g; // componete verde rgb em data
	var b; // componete azul em data
	var rt = 0; // a soma dos valores de vermelho em rgb
	var gt = 0; // a soma dos valores de verde em rgb
	var bt = 0; // a soma dos valores de azul em rgb
	var rh; // componete vermelho convertido para hexa
	var gh; // componete verde convertido para hexa
	var bh; // componete azul convertido para hexa em data
	var rgb; // string da cor em rgb
	var hexa; // string da cor em hexa
	
	for (var x = 0; x < this.w; x++) {
		for (var y = 0; y < this.h; y++) {
			i = (x + y * this.w ) * 4;
			// preenche coresRGB
			r = this.img.data[i];
			g = this.img.data[i + 1];
			b = this.img.data[i + 2];
			rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
			if (!this.coresRGB[rgb]) this.coresRGB[rgb] = 1;
			else this.coresRGB[rgb] += 1;
			// incrementa o total de cada cor primária
			rt += r;
			gt += g;
			bt += b;
			// preenche coresHexa
			rh = r.toString(16);
			gh = g.toString(16);
			bh = b.toString(16);
			hexa = '0x' + rh + gh + bh;
			if (!this.coresHexa[hexa]) this.coresHexa[hexa] = 1;
			else this.coresHexa[hexa] += 1;
		}
	}
	// preenche corMedia
	var rm = Math.round(rt / this.pixels);
	var gm = Math.round(gt / this.pixels);
	var bm = Math.round(bt / this.pixels);
	this.corMedia.rgbArray = [rm, gm, bm];
	this.corMedia.rgb = 'rgb(' + rm + ',' + gm + ',' + bm + ')';
	this.corMedia.hexa = '0x' + rm.toString(16) + gm.toString(16) + bm.toString(16);
	// preenche corMax
	var max = 0;
	for (var cor in this.coresHexa) {
		if (this.coresHexa[cor] > max) {
			max = this.coresHexa[cor];
			this.corMax.hexa = [cor, this.coresHexa[cor]];
		}
	}
	max = 0;
	for (var cor in this.coresRGB) {
		if (this.coresRGB[cor] > max) {
			max = this.coresRGB[cor];
			this.corMax.rgb = [cor, this.coresRGB[cor]];
		}
	}
	// preencher corProxima
	this._acharCorMaisProxima();
}

ImgCor.prototype._acharCorMaisProxima = function() {
	// cores pré-definidas
	var cores = [ImgCor.PRETO,
				ImgCor.MARINHO,
				ImgCor.AZUL,
				ImgCor.VERDE,
				ImgCor.PETROLEO,
				ImgCor.DODGER,
				ImgCor.LIMA,
				ImgCor.PRIMAVERA,
				ImgCor.AQUA,
				ImgCor.VINHO,
				ImgCor.ROXO,
				ImgCor.INDIGO,
				ImgCor.OLIVA,
				ImgCor.CINZA,
				ImgCor.ARDOSIA,
				ImgCor.VERDE_CHOQUE,
				ImgCor.VERDE_CLARO,
				ImgCor.AZUL_ELETRICO,
				ImgCor.VERMELHO,
				ImgCor.ROSA_CHOQUE,
				ImgCor.MAGENTA,
				ImgCor.LARANJA_ESCURO,
				ImgCor.CORAL_ESCURO,
				ImgCor.ROSA_FUCSIA,
				ImgCor.AMARELO,
				ImgCor.HAMAMELIA,
				ImgCor.BRANCO];
	// componentes da cor média
	var rm = this.corMedia.rgbArray[0];
	var gm = this.corMedia.rgbArray[1];
	var bm = this.corMedia.rgbArray[2];
	// valores dos componentes da cor de menor diferença
	var ir = this._maisProximo(rm);
	var ig = this._maisProximo(gm);
	var ib = this._maisProximo(bm);
	// encontra a cor se tiver na lista
	for (var i in cores) {
		if (cores[i][0] == ir && cores[i][1] == ig && cores[i][2] == ib) {
			cor = cores[i];
			this.corProxima.rgbArray = [cor[0], cor[1], cor[2]];
			this.corProxima.rgb = 'rgb(' + cor[0] + ',' + cor[1] + ',' + cor[2] + ')';
			this.corProxima.hexa = '0x' + cor[0].toString(16) + cor[1].toString(16) + cor[2].toString(16);
			this.corProxima.nome = cor[3];
		}
	}		
};

ImgCor.prototype._maisProximo = function(valor) { // arredonda entre 0, 128 e 255
	if (valor < 85) return 0;
	else if (valor <= 170) return 128;
	else return 255;
}