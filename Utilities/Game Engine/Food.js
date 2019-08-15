class Food extends Cell {
	constructor(cell) {
		super(cell);
		this.t = 0;
	}

	show(factor, clr) {
		const x = this.pos.x * factor + (factor / 2);
		const y = this.pos.y * factor + (factor / 2);
		let offset =  12 + (2 * sin(this.t));
		push();
		fill(clr);
		stroke(255);
		strokeWeight(2);
		//rectMode(CENTER);
		translate(x, y);
		//square(x + offset, y + offset, factor - 2 * offset);
		circle(0, 0, factor - 2 * offset);
		pop();
		this.t += 0.6;
	}
}