let constraints = {};
let dir = {};
let score, txtScore, timer, txtTime;
let cellSize = 50;
let snake, food;
let route;
let grid;

function setup() {
	init();
	console.log('%c Snake', "color: lime; font-weight: bold");
	const cols = floor(width / cellSize);
	const rows = floor(height / cellSize);
	constraints['cols'] = cols;
	constraints['rows'] = rows;
	console.log(constraints);
	grid = new Grid(cellSize);
	snake = new Snake(grid.randomCell());
	food = new Food(grid.randomCell());
	route = createVector();
	dir['horizontal'] = false;
	dir['vertical'] = false;
}

function keyPressed() {
	switch (keyCode) {
		case LEFT_ARROW:
			if (!dir.horizontal) {
				route.set(-1, 0);
				dir.horizontal = true;
				dir.vertical = false;
			}
			break;
		case RIGHT_ARROW:
			if (!dir.horizontal) {
				route.set(1, 0);
				dir.horizontal = true;
				dir.vertical = false;
			}
			break;
		case UP_ARROW:
			if (!dir.vertical) {
				route.set(0, -1);
				dir.vertical = true;
				dir.horizontal = false;
			}
			break;
		case DOWN_ARROW:
			if (!dir.vertical) {
				route.set(0, 1);
				dir.vertical = true;
				dir.horizontal = false;
			}
			break;
		default:
			console.log('%c Invalid Key', "color: red");
			break;
	}
}

function draw() {
	background(255);
	txtTime.innerText = `${int(millis() / 1000)} s`;
	grid.display();
	drawOutline();
	snake.show(cellSize, color(0));
	if (!snake.move(route.copy(), grid)) {
		fill(255, 0, 0);
		textSize(32);
		textStyle(BOLD);
		text("GAME OVER", width / 2, height / 2);
		noLoop();
	}
	food.show(cellSize, color(139, 50, 72));
	if (snake.eat(food)) {
		score += 10;
		txtScore.innerText = `${score}`;
		let pos;
		do {
			pos = grid.randomCell().pos.copy();
		} while (snake.hitsBody(pos));
		food.setLocation(pos);
		snake.grow(route.copy());
	}
}

function drawOutline() {
	push();
	noFill();
	stroke(0);
	strokeWeight(5);
	rect(0, 0, width, height);
	pop();
}

function init() {
	createCanvas(600, 500);
	frameRate(10);
	textAlign(CENTER, CENTER);
	score = 0;
	timer = 0;
	const btnReset = document.getElementById('btn-reset');
	btnReset.addEventListener('click', () => {
		snake = new Snake(grid.randomCell());
		food = new Food(grid.randomCell());
		score = 0;
		txtScore.innerText = 0;
		timer = 0;
		loop();
	});
	txtTime = document.getElementById('time');
	txtScore = document.getElementById('score');
}