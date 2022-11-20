/**
* grafico.js 1.0, 31/10/2022
* Autor: Thiago de O. Alves.
*/

/**
* Sinopse: Classe para operações com matrizes.
*	Grafico(contexto, xmin, xmax, ymin, ymax, x0, y0, largura, altura)
* Dados:
*	Possui os seguintes dados públicos:
*		contexto: contexto do canvas.
*       xmin: número com o menor valor de x.
*       xmax: número com o maior valor de x.
*       ymin: número com o menor valor de x.
*       ymax: número com o maior valor de y.
*       x0: número com a coordenada x (em pixels) do topo direito da grade em relação ao canvas.
*       y0: número com a coordenada y (em pixels) do topo direito da grade em relação ao canvas.
*       largura: número com a largura (em pixels) da grade.
*       altura: número com a altura (em pixels) da grade.
*       finalGradeX: número com a coordenada x (em pixels) do fim da grade.
*       finalGradeY: número com a coordenada y (em pixels) do fim da grade.
*       xEscala: número com a distância (em pixels) entre traços da escala de x.    
*       yEscala: número com a distância (em pixels) entre traços da escala de y.  
*       xOrigem: coordenada x (em pixels) da origem do sistema.
*       yOrigem: coordenada y (em pixels) da origem do sistema.
* Métodos: 
*	Possui as seguintes funções públicas:
*		desenharGrades: desenha os traços da grade.
*		desenharEixos: desenha os eixos da grade.
*		plotar: desenha o gráfico sobra a grade.
* Exemplo:
*   // Captura um canvas de largura 700px e altura 500px
*	const canvas = document.querySelector("canvas");
*   const ctx = canvas.getContext("2d");
*   const g = new Grafico(ctx, -5, 5, -10, 10, 150, 50, 400, 400);
*   g.desenharGrades(1, 0.5, 2, 1);
*   g.desenharEixos("eixo das abscissas", "eixo das ordenadas");
*   const x = [-3, -2, -1, 0, 1, 2, 3];
*   const y = [9, 4, 1, 0, 1, 4, 9];
*   g.plotar(x, y, true, true);
* DESDE: 1.0
* VEJA: 
*	documentação interna das funções.
*/

class Grafico {
    constructor(contexto, xmin, xmax, ymin, ymax, x0, y0, largura, altura) {
        this.contexto = contexto;
        this.xmin = xmin; // menor valor de x
        this.xmax = xmax; // maior valor de x
        this.ymin = ymin; // menor valor de y
        this.ymax = ymax; // maior valor de y
        this.x0 = x0; // coordenada x do topo direito da grade
        this.y0 = y0; // coordenada y do topo direito da grade
        this.largura = largura; // largura da grade
        this.altura = altura; // altura da grade
        this.finalGradeX = x0 + largura; // coordenada x do fim da grade
        this.finalGradeY = y0 + altura; // coordenada y do fim da grade
        this.xEscala = largura / (xmax - xmin); // distância entre traços da escala de x     
        this.yEscala = altura / (ymax - ymin); // distância entre traços da escala de y
        this.xOrigem = xmin < 0 ? x0 - xmin * this.xEscala : x0; // coordenada x da origem do sistema
        this.yOrigem = ymin < 0 ? this.finalGradeY + ymin * this.yEscala : this.finalGradeY; // coordenada y da origem do sistema   
    }

    /**
    * Sinopse: desenha os traços da grade com suas marcações de escala e subdivisões.
    *  g.desenharGrades(xTraco, xSubdivisao, yTraco, ySubdivisao)
    * Entrada(s):
    *  xTraco: número representando em quais valores serão marcados os traços da escala de x.
    *  xSubdivisao: número representando em quais valores serão marcados as subdivisões da escala de x.
    *  yTraco: número representando em quais valores serão marcados os traços da escala de y.
    *  ySubdivisao: número representando em quais valores serão marcados as subdivisões da escala de y.
    * DESDE: 1.0  
    */

    desenharGrades(xTraco, xSubdivisao, yTraco, ySubdivisao) {
        const passoTracoX = xTraco * this.xEscala;
        const passoTracoY = yTraco * this.yEscala;
        const passoSubdivisaoX = xSubdivisao * this.xEscala;
        const passoSubdivisaoY = ySubdivisao * this.yEscala;

        // desenha os traços de escala
        this.contexto.save();
        this.contexto.styleStroke = "#999999";
        this.contexto.lineWidth = 1;
        this.contexto.beginPath();
        
        for (let i = this.x0; i <= this.finalGradeX; i += passoTracoX) {
            this.contexto.moveTo(i, this.y0);
            this.contexto.lineTo(i, this.finalGradeY);
        }
        
        for (let i = this.y0; i <= this.finalGradeY; i += passoTracoY) {
            this.contexto.moveTo(this.x0, i);
            this.contexto.lineTo(this.finalGradeX, i); 
        }
        
        this.contexto.stroke();
        this.contexto.restore();
        
        // desenha os traços de subdivisão de escala
        this.contexto.save();
        this.contexto.styleStroke = "#cccccc";
        this.contexto.lineWidth = 1;
        this.contexto.beginPath();
        
        for (let i = this.x0; i <= this.finalGradeX; i += passoSubdivisaoX) {
            this.contexto.moveTo(i, this.y0);
            this.contexto.lineTo(i, this.finalGradeY);
        }
        
        for (let i = this.y0; i <= this.finalGradeY; i += passoSubdivisaoY) {
            this.contexto.moveTo(this.x0, i);
            this.contexto.lineTo(this.finalGradeX, i);
        }
        
        this.contexto.stroke();
        this.contexto.restore();

        // marca os valores nos traços de escala
        this.contexto.save();
        this.contexto.font = "10pt Arial";
        this.contexto.fillStyle = '#000000';
        this.contexto.textAlign = 'left';
        this.contexto.textBaseline = 'top';
        let valorX = this.xmin;
        let valorY = this.ymin;

        for (let i = this.x0; i <= this.finalGradeX; i += passoTracoX) {
            this.contexto.fillText(valorX, i + 2, this.yOrigem + 5);
            valorX += xTraco;
        }
        
        this.contexto.textAlign = 'right';

        for (let i = this.y0; i <= this.finalGradeY; i += passoTracoY) {
            this.contexto.fillText(valorY, this.xOrigem - 5, i + 2); 
            valorY += yTraco;
        }

        this.contexto.restore();
    }

    /**
    * Sinopse: desenha os eixos do sistema de coordenadas.
    *  g.desenharEixos(rotuloX, rotuloY)
    * Entrada(s):
    *  rotuloX (opcional): texto que representa o rótulo informativo do eixo x. 
    *  rotuloY (opcional): texto que representa o rótulo informativo do eixo y.
    * Descrição:
    *  Os textos serão incluídos nas extremidades dos eixos como legendas. Caso 
    *  nenhum parâmetro seja passado para a função, os rótulos "x" e "y" serão 
    *  incluídos como padrão.
    * DESDE: 1.0  
    */

    desenharEixos(rotuloX, rotuloY) {
        // valores padrões para os rótulos
        if (rotuloX == null) rotuloX = 'x';
		if (rotuloY == null) rotuloY = 'y';	

        // desenha os eixos
        this.contexto.save();
        this.contexto.strokeStyle = "#000000";
        this.contexto.lineWidth = 3;
        this.contexto.beginPath();
        this.contexto.moveTo(this.xOrigem, this.y0);
        this.contexto.lineTo(this.xOrigem, this.finalGradeY);
        this.contexto.moveTo(this.x0, this.yOrigem);
        this.contexto.lineTo(this.finalGradeX, this.yOrigem);
        this.contexto.stroke();
        this.contexto.restore();

        // inclui rótulos nos eixos
        this.contexto.save();
        this.contexto.font = "12pt Arial";
		this.contexto.fillStyle = '#000000';
        this.contexto.textAlign = "center";
        this.contexto.fillText(rotuloX, this.finalGradeX + 40, this.yOrigem);
		this.contexto.fillText(rotuloY, this.xOrigem, this.y0 - 10);
        this.contexto.restore();
    }

    /**
    * Sinopse: marca os pontos e traça as linhas do gráfico
    *  g.plotar(xArray, yArray, cor, pontos, linha)
    * Entrada(s):
    *  xArray: array numérico com os valores das abscissas dos pontos a serem plotados. 
    *  yArray: array numérico com os valores das ordenadas dos pontos a serem plotados. 
    *  cor (opcional): texto com cor dos pontos e das linhas do gráfico.
    *  pontos (opcional): valor booleano indicando se serão destacados os pontos no gráfico.
    *  linha (opcional): valor booleano indicando se serão traçadas as linhas ligando os pontos no gráfico.
    * Descrição:
    *  Casos os valores opcionais não sejam incluídos, a cor "#0000ff" (azul), e pontos = linha = true
    *  serão configurados como padrão. Isso criará um gráfico azul de pontos ligados entre si.
    * DESDE: 1.0  
    */

    plotar(xArray, yArray, cor, pontos, linha) {
        if (cor == null) cor = '#0000ff';
		if (pontos == null) pontos = true;
		if (linha == null) linha = true;

        let x = this.xOrigem + xArray[0] * this.xEscala;
        let y = this.yOrigem - yArray[0] * this.yEscala;
		
        this.contexto.save();
        this.contexto.strokeStyle = cor;        
        this.contexto.beginPath();
        this.contexto.moveTo(x, y);
        this.contexto.arc(x, y, 1, 0, 2 * Math.PI);

        for (let i = 1; i < xArray.length; i++) {
            x = this.xOrigem + xArray[i] * this.xEscala;
            y = this.yOrigem - yArray[i] * this.yEscala;

            if (linha) {
                this.contexto.lineTo(x, y);
            } else {
                this.contexto.moveTo(x, y);
            }

            if (pontos) {
                this.contexto.arc(x, y, 1, 0, 2 * Math.PI);
            }
        }

        this.contexto.stroke();
        this.contexto.restore();
    }
}