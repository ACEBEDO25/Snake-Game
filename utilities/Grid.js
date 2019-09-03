class Grid {
	constructor(cellSize) {
		this.cellSize = cellSize;
		this.cells = [];
		this.init();
	}

	init() {
		for (let y = 0; y < constraints.rows; y++) {
			for (let x = 0; x < constraints.cols; x++) {
				let cell = new Cell(x, y);
				this.cells.push(cell);
			}
		}
	}

	randomCell() {
		const index = int(random(0, this.cells.length));
		return this.cells[index];
	}

	display() {
		this.cells.forEach((cell) => {
			cell.show(this.cellSize, color(171, 195, 47));
		});
	}
}