// display game over text
function gameOverText() {
    // show end screen
    textSize(30);
    text('Game Over', width/2, height/2);

    // show end icon
    image(retryImage, width/2, height*.55);
}

// display paused text
function pauseText() {
    textSize(30);
    text('Paused', width/2, height/2);
}




// switch to grass scene
function switchToGrass() {
    scene = 'grass';

    // change images
    backgroundImage = bgGrassImage;
    roadImage = roadGrassImage;
    obstacleImages = treeImages;
    flyingObstacleFrames = crowFrames;

    // change bgm
    backgroundMusic = gameMusicGrass;
    backgroundMusic.stop();
    backgroundMusic.play();

    if (!muted)
        backgroundMusic.setVolume(1);
    else
        backgroundMusic.setVolume(0);

    // update obstacles
    for (let i = 0; i < NUM_OBSTACLES; i++) {
        const xoff = random(800, 1000)
        const randImg = randInt(0, 3);
        obstacles[i].x = width*2 + xoff*i;
        obstacles[i].y = height*currentSizing["trees"];
        obstacles[i].frame = obstacleImages[randImg];
        obstacles[i].size = currentSizing["treeSize"];
    }
    bird.x = obstacles[NUM_OBSTACLES-1].x + random(300, 800);
    bird.y = height*currentSizing["bird"];
    lastObstacle = bird;
    bird.enabled = true;

    // update background objects
    lastBackgroundObject.x = random(width, width*currentSizing["bgObjVariance"]);
    for (let i = 0; i < NUM_BG_OBJECTS; i++) {
        const x = random(width, width*currentSizing["bgObjVariance"]);
        const y = random(height*currentSizing["bgObjYMin"], height*currentSizing["bgObjYMax"]);
        const s = random(currentSizing["bgObjSizeMin"], currentSizing["bgObjSizeMax"]);
        bgObjs[i].x = lastBackgroundObject.x + x;
        bgObjs[i].y = y;
        bgObjs[i].size = s;
        bgObjs[i].frames = grassObjects;
        bgObjs[i].frame = grassObjects[ randInt(0, grassObjects.length) ];
        lastBackgroundObject = bgObjs[i];
    }

}


