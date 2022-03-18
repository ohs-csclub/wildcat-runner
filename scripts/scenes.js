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
    obstacleImage = treeImage;
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
        obstacles[i].x = width*2 + xoff*i;
        obstacles[i].y = height*currentSizing["trees"];
        obstacles[i].frame = obstacleImage;
        obstacles[i].size = currentSizing["treeSize"];
    }
    bird.x = obstacles[NUM_OBSTACLES-1].x + random(300, 800);
    lastObstacle = bird;

    bird.y = height*currentSizing["bird"];

    bird.enabled = true;
}


