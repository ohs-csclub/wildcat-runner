// images
let bgTunnelImage;
let bgGrassImage;
let roadTunnelImage;
let roadGrassImage;
let treeImage;
let coneImage;
let retryImage;
let wildcatFrames = [];
let birdFrames = [];
let crowFrames = [];
let clouds = [];

// sounds
let failSound;
let scoreSound;
let jumpSound;
let gameMusicGrass;
let gameMusicTunnel;

// font
let pressStartFont;

// variables
let roadOffset = 0;
let roadSpeed = -10;
let paused = false;
const NUM_OBSTACLES = 3;

// scores
let score = 0;
let highScore = 0;
const MAX_FLASH_COOLDOWN = 1;
const BLINK_FRAME_DURATION = 60;
let flashCooldown = MAX_FLASH_COOLDOWN;
let blinkFrames = 0;
let hideScores = false;

// objects
let wildcat;
let obstacles = [];


function preload() {
    // images
    bgTunnelImage = loadImage('./assets/bg.png');
    bgGrassImage = loadImage('./assets/bg2.png');
    roadTunnelImage = loadImage('./assets/road.png');
    roadGrassImage = loadImage('./assets/road2.png');
    treeImage = loadImage('./assets/tree.png');
    coneImage = loadImage('./assets/traffic_cone.png');
    retryImage = loadImage('./assets/retry.png');

    // frames
    wildcatFrames[0] = loadImage('./assets/wildcat.png');
    wildcatFrames[1] = loadImage('./assets/wildcat2.png');
    birdFrames[0] = loadImage('./assets/bird.png');
    birdFrames[1] = loadImage('./assets/bird2.png');
    crowFrames[0] = loadImage('./assets/crow.png');
    crowFrames[1] = loadImage('./assets/crow2.png');

    // variants
    clouds[0] = loadImage('./assets/cloud1.png');
    clouds[1] = loadImage('./assets/cloud2.png');
    clouds[2] = loadImage('./assets/cloud3.png');

    // sounds
    failSound = loadSound('./assets/Fail.wav');
    jumpSound = loadSound('./assets/Jump.wav');
    scoreSound = loadSound('./assets/Score.wav');
    gameMusicTunnel = loadSound('./assets/Game Music Ghostly.mp3');
    gameMusicGrass = loadSound('./assets/Game Music.mp3');

    // font
    pressStartFont = loadFont('./assets/PressStart2P-Regular.ttf');
}

function setup() {
    const w = window.innerWidth * .8;
    const h = window.innerHeight * .8;
    createCanvas(w, h);

    wildcat = new Wildcat(100, height*WILDCAT_VERTICAL_CONSTRAINT_FACTOR, 120);

    for (let i = 0; i < NUM_OBSTACLES; i++) {
        const xoff = randomRange(400, 1000)
        obstacles.push( new Obstacle(width*2 + xoff*i, height*.86, 120, coneImage) );
    }

    gameMusicTunnel.play();

    imageMode(CENTER);
    textFont(pressStartFont);
    textAlign(CENTER);

    // TODO: switch scene at 1050
}

function draw() {
    background(220);

    // background
    image(bgTunnelImage, width/2, height/2, width, height);
    image(roadTunnelImage, width + roadOffset, height/2, width*2, height);

    // score text
    if (blinkFrames > 0) {
        blinkFrames--;

        if (blinkFrames % 10 == 0)
            hideScores = !hideScores;
    }

    if (!hideScores) {
        fill(255);
        textSize(12);
        if (highScore)
            text(`HI ${highScore.toString().padStart(5, '0')} ${Math.floor(score).toString().padStart(5, '0')}`, width*0.856, height*0.1);
        else
            text(`${Math.floor(score).toString().padStart(5, '0')}`, width*0.9, height*0.1);
    }

    if (paused) {
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
    if (flashCooldown <= 0 && Math.floor(score) % 100 == 0) {
        scoreSound.play();
        blinkFrames = BLINK_FRAME_DURATION;
        flashCooldown = MAX_FLASH_COOLDOWN;

        roadSpeed -= 0.5;
    } else
        flashCooldown -= 1/60;

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
        
        if (paused)
            restart();
    }
}



function gameOver() {
    paused = true;
    if (score > highScore)
        highScore = Math.floor(score);
    failSound.play();
    gameMusicTunnel.stop();
}

function restart() {
    paused = false;

    gameMusicTunnel.play();

    for (let i = 0; i < NUM_OBSTACLES; i++) {
        const xoff = randomRange(400, 1000)
        obstacles[i].x = width*2 + xoff*i;
    }
    lastObstacle = obstacles[NUM_OBSTACLES-1];
    
    score = 0;
    flashCooldown = MAX_FLASH_COOLDOWN;
}



// utility
function randomRange(min, max) {
    return Math.random()*(max - min) + min;
}
