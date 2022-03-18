// finish: 1450

// images
let bgTunnelImage;
let bgGrassImage;
let roadTunnelImage;
let roadGrassImage;
let treeImage;
let coneImage;
let retryImage;
let wildcatFrames = [];
let crowFrames = [];
let clouds = [];

// sounds
let failSound;
let scoreSound;
let jumpSound;
let gameMusicGrass;
let gameMusicTunnel;

// general variables
let backgroundImage;
let roadImage;
let obstacleImage;
let flyingObstacleFrames;
let backgroundMusic;

// font
let pressStartFont;

// variables
const DEFAULT_ROAD_SPEED = -10;
const NUM_OBSTACLES = 3;
let roadOffset = 0;
let roadSpeed = DEFAULT_ROAD_SPEED;
let paused = false;
let over = false;
let started = false;
let muted = false;
let scene = 'tunnel';

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
let bird;

// sizes
const sizes = {
    "small": {
        "cones": 0.86,
        "trees": 0.85,
        "bird": 0.47,
        "wildcat": 0.86,
        "wildcatSize": 100,
        "birdSize": 80,
        "coneSize": 100,
        "treeSize": 130,
        "titleSize": 25,
        "hiScore": .8
    },
    "medium": {
        "cones": 0.86,
        "trees": 0.85,
        "bird": 0.55,
        "wildcat": 0.86,
        "wildcatSize": 110,
        "birdSize": 90,
        "coneSize": 110,
        "treeSize": 140,
        "titleSize": 30,
        "hiScore": .83
    },
    "large": {
        "cones": 0.86,
        "trees": 0.85,
        "bird": 0.65,
        "wildcat": 0.86,
        "wildcatSize": 120,
        "birdSize": 100,
        "coneSize": 120,
        "treeSize": 150,
        "titleSize": 35,
        "hiScore": .856
    }
}
let currentSizing;

// determine sizing
determineSizes();


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

    // configure width and height
    createCanvas(w, h);
    const canvas = document.querySelector('canvas');
    document.querySelector('.container').appendChild(canvas);

    wildcat = new Wildcat(100, height*currentSizing["wildcat"], currentSizing["wildcatSize"]);

    // setup sounds and images
    backgroundImage = bgTunnelImage;
    roadImage = roadTunnelImage;
    obstacleImage = coneImage;
    flyingObstacleFrames = crowFrames;
    backgroundMusic = gameMusicTunnel;

    // create obstacles
    for (let i = 0; i < NUM_OBSTACLES; i++) {
        const xoff = random(800, 1000)
        obstacles.push( new Obstacle(width*2 + xoff*i, height*currentSizing["cones"], currentSizing["coneSize"], obstacleImage) );
    }

    bird = new Bird(width*3, height*currentSizing["bird"], currentSizing["birdSize"], flyingObstacleFrames, false);

    imageMode(CENTER);
    textFont(pressStartFont);
    textAlign(CENTER);

    // mute
    if (muted) {
        backgroundMusic.setVolume(0);
        failSound.setVolume(0);
        jumpSound.setVolume(0);
        scoreSound.setVolume(0);
    }
}

function draw() {
    background(220);

    // background
    image(backgroundImage, width/2, height/2, width, height);
    image(roadImage, width + roadOffset, height/2, width*2, height);

    // display starting title card
    if (!started) {
        fill(255);
        textSize(currentSizing["titleSize"]);
        text('Wildcat\nRunner\n2022', width/2, height*.3);

        fill(`rgba(255, 255, 255, ${.45*Math.sin(millis()*.002)+.55})`);
        textSize(12);
        text('Press space to start', width/2, height*.62);

        wildcat.show();
        return;
    }

    // score text
    if (blinkFrames > 0) {
        blinkFrames--;

        if (blinkFrames % 10 == 0)
            hideScores = !hideScores;
    }

    // display high scores or not
    if (!hideScores) {
        fill(255);
        textSize(12);
        if (highScore)
            text(`HI ${highScore.toString().padStart(5, '0')} ${Math.floor(score).toString().padStart(5, '0')}`, width*currentSizing["hiScore"], height*0.1);
        else
            text(`${Math.floor(score).toString().padStart(5, '0')}`, width*.88, height*0.1);
    }

    // transition
    if (transitionTo) {
        score += 8/60;
        transitionTime -= 1/60;
        
        const alpha = Math.max(0, Math.sin(transitionTime/TRANSITION_DURATION*Math.PI));
        background(`rgba(0, 0, 0, ${alpha})`);
        
        // show wildcat
        wildcat.show();

        if (transitionTime <= .5 && transitionTo == "grass") {
            switchToGrass();
            transitionTo = "end";
        } else if (transitionTime <= 0) {
            transitionTo = null;
            paused = false;
        }

        return;
    }

    // paused
    if (paused) {

        // show wildcat & obstacles
        wildcat.show();
        for (obstacle of obstacles)
            obstacle.show();
        bird.show();

        // show game over text
        if (over)
            gameOverText();
        else
            pauseText();

        return;
    }

    // updating score
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
        roadOffset += width;

    // handle obstacles
    for (obstacle of obstacles) {
        obstacle.update();
        obstacle.show();
    }

    // handle bird
    bird.update();
    bird.show();

    // handle wildcat
    wildcat.update();
    wildcat.show();
}

// handle keys
function keyPressed() {
    if (keyCode == 32) {
        if (!started && backgroundMusic != undefined) {
            start();
            return;
        }

        handleJump();
    } else if (started && (keyCode == 27 || keyCode == 80)) {
        pause(!paused);
    }
}

// handle touch
function touchStarted() {
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
        return;

    if (!started) {
        start();
        return;
    }

    handleJump();
}


// handle jumping
function handleJump() {
    if (over)
        restart();
    else if (!paused)
        wildcat.jump();
}


// start the game
function start() {
    if (window.innerHeight > window.innerWidth)
        return;

    started = true;
    backgroundMusic.play();
}


// pause the game
function pause(toggle) {
    if (!started || over)
        return;

    paused = toggle;

    if (toggle) {
        backgroundMusic.setVolume(0);
    } else if (!muted) {
        backgroundMusic.setVolume(1);
    }
}


// declare game over
function gameOver() {
    pause(true);
    over = true;
    if (score > highScore)
        highScore = Math.floor(score);
    failSound.play();
}


// restart the game
function restart() {
    paused = false;
    over = false;
    scene = 'tunnel';

    // reset scene
    backgroundImage = bgTunnelImage;
    roadImage = roadTunnelImage;
    obstacleImage = coneImage;
    flyingObstacleFrames = crowFrames;
    backgroundMusic = gameMusicTunnel;

    backgroundMusic.stop();
    backgroundMusic.play();

    if (!muted)
        backgroundMusic.setVolume(1);

    for (let i = 0; i < NUM_OBSTACLES; i++) {
        const xoff = random(800, 1000)
        obstacles[i].x = width*2 + xoff*i;
        obstacles[i].y = height*currentSizing["cones"];
        obstacles[i].frame = obstacleImage;
        obstacles[i].size = currentSizing["coneSize"];
    }
    bird.x = width*2;
    bird.y = height*currentSizing["bird"];
    lastObstacle = obstacles[NUM_OBSTACLES-1];

    bird.enabled = false;
    
    score = 0;
    flashCooldown = MAX_FLASH_COOLDOWN;
    roadSpeed = DEFAULT_ROAD_SPEED;
}


function determineSizes() {
    if (window.innerWidth < 640)
        currentSizing = sizes["small"];
    else if (window.innerWidth <= 1007)
        currentSizing = sizes["medium"];
    else if (window.innerWidth > 1007)
        currentSizing = sizes["large"];
}
