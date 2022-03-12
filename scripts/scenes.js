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
    // change images
    backgroundImage = bgGrassImage;
    roadImage = roadGrassImage;
    obstacleImage = treeImage;
    flyingObstacleFrames = crowFrames;

    // change bgm
    backgroundMusic = gameMusicGrass;

    if (muted)
        backgroundMusic.setVolume(0);
    else
        backgroundMusic.play();

    // update obstacles
    for (let i = 0; i < NUM_OBSTACLES; i++) {
        const xoff = random(800, 1000)
        obstacles[i].x = width*2 + xoff*i;
        obstacles[i].y = height*.85;
        obstacles[i].frame = obstacleImage;
        obstacles[i].size = 150;
    }
    bird.x = obstacles[NUM_OBSTACLES-1].x + random(300, 800);
    lastObstacle = bird;

    bird.enabled = true;
}


