// images
let backgroundImage;
let birdImage;
let treeImage;
let roadImage;
let coneImage;
let retryImage;
let wildcatFrames = [];

// font
let pressStartFont;

// variables
let roadOffset = 0;
let roadSpeed = -10;
let pause = false;
const NUM_OBSTACLES = 3;

// scores
let score = 0;
let highScore = 0;

// objects
let wildcat;
let obstacles = [];


function preload() {
    backgroundImage = loadImage('./assets/bg.png');
    birdImage = loadImage('./assets/bird.png');
    treeImage = loadImage('./assets/tree.png');
    roadImage = loadImage('./assets/road.png');
    coneImage = loadImage('./assets/traffic_cone.png');
    retryImage = loadImage('./assets/retry.png');
    wildcatFrames[0] = loadImage('./assets/wildcat.png');
    wildcatFrames[1] = loadImage('./assets/wildcat2.png');
    pressStartFont = loadFont('./assets/PressStart2P-Regular.ttf');
}

function setup() {
    const w = window.innerWidth * .8;
    const h = window.innerHeight * .8;
    createCanvas(w, h);

    wildcat = new Wildcat(100, height*WILDCAT_VERTICAL_CONSTRAINT_FACTOR, 120);

    for (let i = 0; i < NUM_OBSTACLES; i++) {
        const xoff = random(400, 1000)
        obstacles.push( new Obstacle(width*2 + xoff*i, height*.86, 120, coneImage) );
    }

    imageMode(CENTER);
    textFont(pressStartFont);
    textAlign(CENTER);
}

function draw() {
    background(220);

    // background
    image(backgroundImage, width/2, height/2, width, height);
    image(roadImage, width + roadOffset, height/2, width*2, height);

    // score text
    fill(255);
    textSize(12);
    if (highScore)
        text(`HI ${highScore.toString().padStart(5, '0')} ${Math.floor(score).toString().padStart(5, '0')}`, width*0.856, height*0.1);
    else
        text(`${Math.floor(score).toString().padStart(5, '0')}`, width*0.9, height*0.1);

    if (pause) {
        // show wildcat & obstacles
        wildcat.show();
        for (obstacle of obstacles)
            obstacle.show();

        // show end screen
        textSize(30);
        text('Game Over', width/2, height/2);

        // show end icon
        image(retryImage, width/2, height*.55);

        return;
    }

    score += 8/60;

    // handle road movement
    roadOffset += roadSpeed;
    if (roadOffset <= -width)
        roadOffset = 0;

    // handle obstacles
    for (obstacle of obstacles) {
        obstacle.show();
        obstacle.update();
    }

    // handle wildcat
    wildcat.show();
    wildcat.update();
}

function keyPressed() {
    if (keyCode == 32) {
        wildcat.jump();
        
        if (pause)
            restart();
    }
}



function gameOver() {
    pause = true;
    if (score > highScore)
        highScore = Math.floor(score);
}

function restart() {
    pause = false;

    for (let i = 0; i < NUM_OBSTACLES; i++) {
        const xoff = random(400, 1000)
        obstacles[i].x = width*2 + xoff*i;
    }
    lastObstacle = obstacles[NUM_OBSTACLES-1];
    
    score = 0;
}



// utility
function random(min, max) {
    return Math.random()*(max - min) + min;
}
