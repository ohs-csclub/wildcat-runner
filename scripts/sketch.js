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

let backgroundImage;
let roadImage;
let obstacleImage;
let flyingObstacleFrames;
let backgroundMusic;

// sounds
let failSound;
let scoreSound;
let jumpSound;
let gameMusicGrass;
let gameMusicTunnel;

// font
let pressStartFont;

// variables
const DEFAULT_ROAD_SPEED = -10;
const NUM_OBSTACLES = 3;
let roadOffset = 0;
let roadSpeed = DEFAULT_ROAD_SPEED;
let paused = false;

// transition
let transitionTime = 0;
let transitionTo;
const TRANSITION_DURATION = 1;

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

    // setup sounds and images
    backgroundImage = bgTunnelImage;
    roadImage = roadTunnelImage;
    obstacleImage = coneImage;
    flyingObstacleFrames = birdFrames;
    backgroundMusic = gameMusicTunnel;

    for (let i = 0; i < NUM_OBSTACLES; i++) {
        const xoff = randomRange(800, 1000)
        obstacles.push( new Obstacle(width*2 + xoff*i, height*.86, 120, obstacleImage) );
    }

    backgroundMusic.play();

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
        
        // transition
        if (transitionTo) {
            score += 8/60;
            transitionTime -= 1/60;
            
            const alpha = Math.sin(transitionTime/TRANSITION_DURATION*Math.PI);
            background(`rgba(0, 0, 0, ${alpha})`);
            
            // show wildcat
            wildcat.show();

            if (transitionTime <= 0) {
                if (transitionTo == "grass") {
                    backgroundImage = bgGrassImage;
                    roadImage = roadGrassImage;
                    obstacleImage = treeImage;
                    flyingObstacleFrames = crowFrames;
                    backgroundMusic = gameMusicGrass;

                    // update obstacles
                    for (let i = 0; i < NUM_OBSTACLES; i++) {
                        const xoff = randomRange(800, 1000)
                        obstacles[i].x = width*2 + xoff*i;
                        obstacles[i].y = height*.85;
                        obstacles[i].frame = obstacleImage;
                        obstacles[i].size = 150;
                    }
                    lastObstacle = obstacles[NUM_OBSTACLES-1];

                    transitionTo = null;
                    paused = false;

                    gameMusicGrass.play();
                }
            }

            return;
        }

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

    // transition
    if (Math.floor(score) == 350) {
        paused = true;
        transitionTime = TRANSITION_DURATION;
        transitionTo = "grass";
        gameMusicTunnel.stop();
    }

    // handle road movement
    roadOffset += roadSpeed;
    if (roadOffset <= -width)
        roadOffset = 0;

    // handle obstacles
    for (obstacle of obstacles) {
        obstacle.update();
        obstacle.show();
    }

    // handle wildcat
    wildcat.update();
    wildcat.show();
}

function keyPressed() {
    if (keyCode == 32) {
        wildcat.jump();
        
        if (paused && !transitionTo)
            restart();
    }
}



function gameOver() {
    paused = true;
    if (score > highScore)
        highScore = Math.floor(score);
    failSound.play();
    backgroundMusic.stop();
}

function restart() {
    paused = false;

    // reset scene
    backgroundImage = bgTunnelImage;
    roadImage = roadTunnelImage;
    obstacleImage = coneImage;
    flyingObstacleFrames = birdFrames;
    backgroundMusic = gameMusicTunnel;
    backgroundMusic.play();

    for (let i = 0; i < NUM_OBSTACLES; i++) {
        const xoff = randomRange(800, 1000)
        obstacles[i].x = width*2 + xoff*i;
        obstacles[i].y = height*.86;
        obstacles[i].frame = obstacleImage;
        obstacles[i].size = 120;
    }
    lastObstacle = obstacles[NUM_OBSTACLES-1];
    
    score = 0;
    flashCooldown = MAX_FLASH_COOLDOWN;
    roadSpeed = DEFAULT_ROAD_SPEED;
}





// utility
function randomRange(min, max) {
    return Math.random()*(max - min) + min;
}
