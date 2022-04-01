// finish: 1450

// images
let bgTunnelImage;
let bgGrassImage;
let roadTunnelImage;
let roadGrassImage;
let retryImage;
let treeImages = [];
let coneImages = [];
let wildcatFrames = [];
let crowFrames = [];
let clouds = [];
let tunnelObjects = [];
let grassObjects = [];

// sounds
let failSound;
let scoreSound;
let jumpSound;
let gameMusicGrass;
let gameMusicTunnel;

// general variables
let backgroundImage;
let roadImage;
let obstacleImages;
let flyingObstacleFrames;
let backgroundMusic;

// font
let pressStartFont;

// variables
const DEFAULT_ROAD_SPEED = -10;
const NUM_OBSTACLES = 3;
const NUM_BG_OBJECTS = 3;
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
let bgObjs = [];
let bird;

// sizes
const sizes = {
    "small": {
        "cones": 0.86,
        "trees": 0.85,
        "bird": 0.47,
        "wildcatY": 0.86,
        "wildcatSize": 90,
        "wildcatBoost": -11,
        "birdSize": 80,
        "coneSize": 100,
        "treeSize": 120,
        "titleSize": 25,
        "hiScore": .8,
        "bgObjSizeMin": .3,
        "bgObjSizeMax": .36,
        "bgObjYMin": .32,
        "bgObjYMax": .35,
        "bgObjVariance": 2.3,
        "roadAcceleration": 0.25
    },
    "medium": {
        "cones": 0.86,
        "trees": 0.85,
        "bird": 0.55,
        "wildcatY": 0.86,
        "wildcatSize": 105,
        "wildcatBoost": -12,
        "birdSize": 90,
        "coneSize": 115,
        "treeSize": 140,
        "titleSize": 30,
        "hiScore": .83,
        "bgObjSizeMin": .4,
        "bgObjSizeMax": .46,
        "bgObjYMin": .3,
        "bgObjYMax": .38,
        "bgObjVariance": 2.5,
        "roadAcceleration": 0.4
    },
    "large": {
        "cones": 0.86,
        "trees": 0.85,
        "bird": 0.65,
        "wildcatY": 0.86,
        "wildcatSize": 120,
        "wildcatBoost": -12,
        "birdSize": 100,
        "coneSize": 120,
        "treeSize": 150,
        "titleSize": 35,
        "hiScore": .856,
        "bgObjSizeMin": .45,
        "bgObjSizeMax": .5,
        "bgObjYMin": .3,
        "bgObjYMax": .4,
        "bgObjVariance": 2,
        "roadAcceleration": 0.5
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
    treeImages[0] = loadImage('./assets/tree.png');
    treeImages[1] = loadImage('./assets/tree2.png');
    treeImages[2] = loadImage('./assets/tree3.png');
    coneImages[0] = loadImage('./assets/traffic_cone.png');
    coneImages[1] = loadImage('./assets/traffic_cone2.png');
    coneImages[2] = loadImage('./assets/traffic_cone3.png');
    retryImage = loadImage('./assets/retry.png');
    
    // tunnel
    tunnelObjects[0] = loadImage('./assets/yearbook/anime_frame.png');
    tunnelObjects[1] = loadImage('./assets/yearbook/avid_frame.png');
    tunnelObjects[2] = loadImage('./assets/yearbook/buildon_frame.png');
    tunnelObjects[3] = loadImage('./assets/yearbook/crosscountry_frame.png');
    tunnelObjects[4] = loadImage('./assets/yearbook/csclub_frame.png');
    tunnelObjects[5] = loadImage('./assets/yearbook/esa_frame.png');
    tunnelObjects[6] = loadImage('./assets/yearbook/football_frame.png');
    tunnelObjects[7] = loadImage('./assets/yearbook/glee_frame.png');
    tunnelObjects[8] = loadImage('./assets/yearbook/keyclub_frame.png');
    tunnelObjects[9] = loadImage('./assets/yearbook/latinosunidos_frame.png');
    tunnelObjects[10] = loadImage('./assets/yearbook/pfec_frame.png');
    tunnelObjects[11] = loadImage('./assets/yearbook/senior_frame.png');
    tunnelObjects[12] = loadImage('./assets/yearbook/staff_frame.png');
    tunnelObjects[13] = loadImage('./assets/yearbook/staff_frame2.png');
    tunnelObjects[14] = loadImage('./assets/yearbook/staff_frame3.png');
    tunnelObjects[15] = loadImage('./assets/yearbook/staff_frame4.png');
    tunnelObjects[16] = loadImage('./assets/yearbook/staff_frame5.png');
    tunnelObjects[17] = loadImage('./assets/yearbook/tennis_frame.png');
    tunnelObjects[18] = loadImage('./assets/yearbook/twin_frame.png');
    tunnelObjects[19] = loadImage('./assets/yearbook/twin_frame2.png');
    tunnelObjects[20] = loadImage('./assets/yearbook/vaamp_frame.png');
    tunnelObjects[21] = loadImage('./assets/yearbook/volleyball_frame.png');
    tunnelObjects[22] = loadImage('./assets/yearbook/basketball_frame.png');

    // grass
    grassObjects[0] = loadImage('./assets/yearbook/bsu_plane.png');
    grassObjects[1] = loadImage('./assets/yearbook/cambodian_plane.png');
    grassObjects[2] = loadImage('./assets/yearbook/idea_plane.png');
    grassObjects[3] = loadImage('./assets/yearbook/lacrosse_plane.png');
    grassObjects[4] = loadImage('./assets/yearbook/lsj_plane.png');
    grassObjects[5] = loadImage('./assets/yearbook/orchestra_plane.png');
    grassObjects[6] = loadImage('./assets/yearbook/quizbowl_plane.png');
    grassObjects[7] = loadImage('./assets/yearbook/soccer_plane.png');
    grassObjects[8] = loadImage('./assets/yearbook/swim_plane.png');
    grassObjects[9] = loadImage('./assets/yearbook/vaamp_plane.png');
    grassObjects[10] = loadImage('./assets/yearbook/volleyball_plane.png');
    grassObjects[11] = loadImage('./assets/cloud1.png');
    grassObjects[12] = loadImage('./assets/cloud2.png');
    grassObjects[13] = loadImage('./assets/cloud3.png');
    
    // frames
    wildcatFrames[0] = loadImage('./assets/wildcat.png');
    wildcatFrames[1] = loadImage('./assets/wildcat2.png');
    crowFrames[0] = loadImage('./assets/crow.png');
    crowFrames[1] = loadImage('./assets/crow2.png');

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

    wildcat = new Wildcat(100, height*currentSizing["wildcatY"], currentSizing["wildcatSize"]);

    // setup sounds and images
    backgroundImage = bgTunnelImage;
    roadImage = roadTunnelImage;
    obstacleImages = coneImages;
    flyingObstacleFrames = crowFrames;
    backgroundMusic = gameMusicTunnel;

    // create obstacles
    for (let i = 0; i < NUM_OBSTACLES; i++) {
        const xoff = random(800, 1000);
        obstacles.push( new Obstacle(width*2 + xoff*i, height*currentSizing["cones"], currentSizing["coneSize"]) );
    }

    bird = new Bird(width*3, height*currentSizing["bird"], currentSizing["birdSize"], flyingObstacleFrames, false);

    // create background objects
    for (let i = 0; i < NUM_BG_OBJECTS; i++) {
        const x = random(width*1.5, width*currentSizing["bgObjVariance"]);
        const y = random(height*currentSizing["bgObjYMin"], height*currentSizing["bgObjYMax"]);
        const s = random(currentSizing["bgObjSizeMin"], currentSizing["bgObjSizeMax"]);
        bgObjs.push( new BackgroundObject(x*(i+1), y, DEFAULT_ROAD_SPEED/3, s, tunnelObjects) );
    }

    // set drawing settings
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
    
    // handle background objects
    for (bgo of bgObjs) {
        if (started && !paused)
            bgo.update();
        bgo.show();
    }

    // road
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
        for (bgo of bgObjs)
            bgo.show();
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

        roadSpeed -= currentSizing["roadAcceleration"];
        obstacleMinOff += 20;
        obstacleMaxOff += 20;
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
        pauseGame(!paused);
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
    if (window.innerHeight > window.innerWidth || !backgroundMusic)
        return;

    started = true;
    backgroundMusic.play();
}


// pause the game
function pauseGame(toggle) {
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
    pauseGame(true);
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
    obstacleImages = coneImages;
    flyingObstacleFrames = crowFrames;
    backgroundMusic = gameMusicTunnel;

    backgroundMusic.stop();
    backgroundMusic.play();

    if (!muted)
        backgroundMusic.setVolume(1);

    // reset obstacles
    for (let i = 0; i < NUM_OBSTACLES; i++) {
        const xoff = random(800, 1000)
        const randImg = randInt(0, 3);
        obstacles[i].x = width*2 + xoff*i;
        obstacles[i].y = height*currentSizing["cones"];
        obstacles[i].frame = obstacleImages[randImg];
        obstacles[i].size = currentSizing["coneSize"];
    }
    bird.x = width*2;
    bird.y = height*currentSizing["bird"];
    bird.enabled = false;
    lastObstacle = obstacles[NUM_OBSTACLES-1];
    
    // reset objects
    lastBackgroundObject.x = random(width, width*currentSizing["bgObjVariance"]);
    for (let i = 0; i < NUM_BG_OBJECTS; i++) {
        const x = random(width, width*currentSizing["bgObjVariance"]);
        const y = random(height*currentSizing["bgObjYMin"], height*currentSizing["bgObjYMax"]);
        const s = random(currentSizing["bgObjSizeMin"], currentSizing["bgObjSizeMax"]);
        bgObjs[i].x = lastBackgroundObject.x + x;
        bgObjs[i].y = y;
        bgObjs[i].size = s;
        bgObjs[i].frames = tunnelObjects;
        bgObjs[i].frame = tunnelObjects[ randInt(0, tunnelObjects.length) ];
        lastBackgroundObject = bgObjs[i];
    }

    // reset variables
    score = 0;
    flashCooldown = MAX_FLASH_COOLDOWN;
    roadSpeed = DEFAULT_ROAD_SPEED;
    obstacleMinOff = 600;
    obstacleMaxOff = 800;
}


function determineSizes() {
    if (window.innerWidth < 640)
        currentSizing = sizes["small"];
    else if (window.innerWidth <= 1007)
        currentSizing = sizes["medium"];
    else if (window.innerWidth > 1007)
        currentSizing = sizes["large"];
}


function randInt(min, max) {
    return Math.floor(random(min, max));
}
