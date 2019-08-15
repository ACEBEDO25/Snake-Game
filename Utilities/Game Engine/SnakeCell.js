class SnakeCell extends Cell {
  constructor(pos) {
    super(pos);
    this.angle = 0;
    this.spin = false;
    this.h = 0;
  }

  show(factor) {
		let x = this.pos.x * factor + (factor / 2);
		let y = this.pos.y * factor + (factor / 2);
		const offset = 10;
    push();
    colorMode(HSB);
		fill(color(this.h, 255, 255));
		strokeWeight(2);
		stroke(255);
    rectMode(CENTER);
    translate(x, y);
    if (this.spin) rotate(this.angle);
    square(0, 0, factor - 2 * offset);
    pop();
    this.angle += random(10, 30);
	}
}