function poligono(n, x, y, w, h, ctx) {
	var ang_central = 2 * Math.PI / n;
	var centro_x = x + w / 2;
	var centro_y = y + h / 2;
	
	ctx.save();
	ctx.fillStyle = 'yellow';
	ctx.fillRect(x, y, w, h);
	
	ctx.beginPath();
	ctx.fillStyle = cor;				

	ctx.moveTo(
		centro_x + (w / 4) * Math.cos((- 0.5) * ang_central),
		centro_y + (h / 4) * Math.sin((- 0.5) * ang_central)
	);
	
	for (var i = 1; i < n; i++) {
		ctx.lineTo(
			centro_x + (w / 4) * Math.cos((i - 0.5) * ang_central),
			centro_y + (h / 4) * Math.sin((i - 0.5) * ang_central)
		);
	}
	ctx.fill();
	
	ctx.restore();
}