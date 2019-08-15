class Cell {
	constructor(x, y) {
		if (x instanceof p5.Vector) {
			this.pos = x.copy();
		} else if (x instanceof Cell) {
			this.pos = x.pos.copy();
		} else {
			this.pos = createVector(x, y);
		}
	}

	setLocation(x, y) {
		if (x instanceof p5.Vector) {
			this.pos = x.copy();
		} else if (x instanceof Cell) {
			this.pos = x.pos.copy();
		} else {
			this.pos.set(x, y);
		}
	}

	checkPosition(pos) {
		let x = pos.x;
		let y = pos.y;
		if (x < 0) return -2;
		else if (x > constraints.cols - 1) return -1;
		else if (y < 0) return 1;
		else if (y > constraints.rows - 1) return 2;
		else return 0;
	}

	show(factor, clr) {
		push();
		let x = this.pos.x * factor;
		let y = this.pos.y * factor;
		noFill();
		strokeWeight(4);
		stroke(176, 223, 78);
		if (clr) fill(clr);
		square(x, y, factor);
		pop();
	}
}