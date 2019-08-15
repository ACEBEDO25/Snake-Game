class Snake extends Cell {
	constructor(cell) {
		super(cell);
		this.history = [];
		this.h = int(random(5, 15));
	}

	eat(food) {
		if (food instanceof Cell) {
			return (this.pos.equals(food.pos));
		}
	}

	grow(dir) {
		this.h += int(random(5, 15));
		if(this.h >= 255) this.h = 0;
		let cell = new SnakeCell(this.pos.copy().sub(dir));
		cell.h = this.h;
		this.history.splice(0, 0, cell);
		this.history = this.history.map(cell => {
			cell.spin = true;
			return cell;
		});
		this.updateHistory();
	}

	hitsBody(copy) {
		for (let cell of this.history) {
			if (copy.equals(cell.pos)) {
				return true;
			}
		}

		return false;
	}

	updateHistory() {
		var tam = this.history.length;
		if (tam > 0) {
			for (let i = tam - 1; i >= 1; i--) {
				let a = this.history[i];
				let b = this.history[i - 1];
				a.setLocation(b.pos);
			}
			this.history[0].setLocation(this.pos);
		}
	}

	move(dir, {cells}) {
		if (dir instanceof p5.Vector) {
			let copy = this.pos.copy().add(dir);
			let status = this.checkPosition(copy);
			if (status != 0) {
				let cell, index, newPos;
				let x = this.pos.x;
				let y = this.pos.y;
				let cols = constraints.cols;
				let rows = constraints.rows;
				switch(status) {
					case -2:
						index = (cols - 1) + y * cols;
						cell = cells[index];
						newPos = cell.pos.copy();
						break;
					case -1:
						index = y * cols;
						cell = cells[index];
						newPos = cell.pos.copy();
						break;
					case 1:
						index = x + (rows - 1) * cols;
						cell = cells[index];
						newPos = cell.pos.copy();
						break;
					case 2:
						cell = cells[x];
						newPos = cell.pos.copy();
						break;
				}

				this.updateHistory();
				this.pos.set(newPos);
				return true;
			} else if(!this.hitsBody(copy)) {
				this.updateHistory();
				this.pos.set(copy);
				return true;
			}
		}

		return false;
	}

	show(factor, clr) {
		const x = this.pos.x * factor;
		const y = this.pos.y * factor;
		const offset = 6;
		push();
		fill(clr);
		strokeWeight(2);
		stroke(255);
		//rectMode(CENTER);
		square(x + offset, y + offset, factor - 2 * offset);
		pop();
		this.history.forEach(cell => cell.show(cellSize));
		this.history = this.history.map(cell => {
			cell.spin = false;
			return cell;
		});
	}
}