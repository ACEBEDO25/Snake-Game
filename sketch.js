let constraints = {};
let cellSize;
let dir = {};
let score;
let snake, food;
let route;
let grid;

function setup() {
    init();
    console.log('%c Snake', "color: lime; font-weight: bold");
    const slider = createSlider(20, 60, 50);
    reset(slider.value());
    slider.input(() => {
        reset(slider.value());
    });
}

function keyPressed() {
    switch (keyCode) {
        case 65:
        case LEFT_ARROW:
            if (!dir.horizontal) {
                route.set(-1, 0);
                dir.horizontal = true;
                dir.vertical = false;
            }
            break;
        case 68:
        case RIGHT_ARROW:
            if (!dir.horizontal) {
                route.set(1, 0);
                dir.horizontal = true;
                dir.vertical = false;
            }
            break;
        case 87:
        case UP_ARROW:
            if (!dir.vertical) {
                route.set(0, -1);
                dir.vertical = true;
                dir.horizontal = false;
            }
            break;
        case 83:
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
    select('#time').html(`${int(millis() / 1000)} s`);
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
        select('#score').html(`${score}`);
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

function reset(value) {
    cellSize = value;
    const cols = ceil(width / cellSize);
    const rows = ceil(height / cellSize);
    constraints['cols'] = cols;
    constraints['rows'] = rows;
    console.log(constraints);
    grid = new Grid(cellSize);
    snake = new Snake(grid.randomCell());
    food = new Food(grid.randomCell());
    route = createVector();
    dir['horizontal'] = false;
    dir['vertical'] = false;
    score = 0;
    loop();
}

function init() {
    createCanvas(600, 500);
    frameRate(10);
    textAlign(CENTER, CENTER);
    score = 0;
    const btnReset = document.getElementById('btn-reset');
    btnReset.addEventListener('click', () => {
        reset();
    });
}