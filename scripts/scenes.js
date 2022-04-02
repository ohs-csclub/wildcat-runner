// display game over text
function gameOverText() {
    // show end screen
    textSize(30);
    text('Game Over', width/2, height*.45);

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
    backgroundMusic.stop();

    // determine bgm depending on past progress
    if (displayedCredits) {
        backgroundMusic = gameMusicGrass;
        backgroundMusic.stop();
        backgroundMusic.loop();
    } else {
        backgroundMusic = gameMusicGrassShortened;
        backgroundMusic.stop();
        backgroundMusic.play();
    }

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



// variables exclusively for the animation
let objectReset = true;
let slowdownCamera = false;
let showingCredits = false;
let endBgY = 0;
let endRoadY = 0;
let endTextY = 0;
let displayedCredits = false;
let saveRoadSpeed = 0;

// setup for final animation
function endAnimPrep() {
    // push right side obstacles to the left
    for (let obs of obstacles) {
        if (obs.x + obs.size > width)
            obs.x = -width - obs.size;
    }
    if (bird.x + bird.size > width)
        bird.x = -width - bird.size;

    // push right side background objects to the left
    for (let bgo of bgObjs) {
        if (bgo.x + bgo.frame.width*bgo.size > width)
            bgo.x = -width - bgo.frame.width*bgo.size;
    }

    // disable obstacle reset
    objectReset = false;
}

// final animation
function startEndAnimation() {
    // swap background
    backgroundImage = bgGrassImageExtended;
    roadImage = roadGrassImage;

    // pan camera up
    showingCredits = true;

    // set variables
    endBgY = -height;
    endRoadY = height/2;
    endTextY = height+200;
}

// play final animation - panning
function endAnim() {
    if (endBgY < height*2-2) {
        endBgY += currentSizing["endScrollSpeed"];
        endRoadY += currentSizing["endScrollSpeed"];
        endTextY -= 1.25;
    } else {
        // when reached the end
        image(backgroundImage, width/2, endBgY, width, height*4);
        image(roadImage, width + roadOffset, endRoadY, width*2, height);

        // display title
        fill(255);
        textSize(currentSizing["titleSize"]);
        text('Continue?', width/2, height*.4);

        // continue
        fill(`rgba(255, 255, 255, ${.45*Math.sin(millis()*.002)+.55})`);
        textSize(12);
        text('Press space to resume', width/2, height*.62);

        displayedCredits = true;
        return;
    }
    constrain(endBgY, -height, height*2-2);

    // images for bg and road
    image(backgroundImage, width/2, endBgY, width, height*4);
    image(roadImage, width + roadOffset, endRoadY, width*2, height);

    // show credits
    textSize(currentSizing["titleSize"]);
    text("Thank you for playing!", width/2, endTextY);
    textSize(currentSizing["endTextSize"]);
    text("(and for making it this far)", width/2, endTextY+currentSizing["endTextSpacing"]*1.2);

    textSize(currentSizing["titleSize"] * 0.9);
    text("Credits", width/2, endTextY+currentSizing["endTextSpacing"]*3);
    textSize(currentSizing["endTextSize"]);
    text("Programming - Jinkang Fang\n\nSound Design - Jinkang Fang\n\nArt - Jinkang Fang\n\nSprites - Jesse Shapiro", width/2, endTextY+currentSizing["endTextSpacing"]*4);

    textSize(currentSizing["endTextSize"] * 0.8);
    text("Images courtesy of the Yearbook Team", width/2, endTextY+currentSizing["endTextSpacing"]*10);

    textSize(currentSizing["titleSize"] * 0.9);
    text("Yearbook Staff", width/2, endTextY+currentSizing["endTextSpacing"]*12);
    textSize(currentSizing["endTextSize"]);
    text("Jesse Shapiro\n\nAngela Le\n\nBelle Gardner\n\nJayla Burkhalter\n\nBinh Nguyen\n\nErick Bibiano\n\nJacob Sonhthila\n\nLeilany Valdovinos\n\nJune Lee\n\nValerie Chao\n\nMyla Estrada\n\nKelly Lin\n\nTri La\n\nZaymani Sampie-Mitchell\n\nJackie Hin\n\nHyab Isayas\n\nIsabella Wong\n\nCindy Guo", width/2, endTextY+currentSizing["endTextSpacing"]*14);
}


// continue the game after credits
function continueGame() {
    // reset variables
    objectReset = true;
    slowdownCamera = false;
    showingCredits = false;
    paused = false;
    transitioning = false;
    hideScores = false;

    // reset background
    backgroundImage = bgGrassImage;
    roadSpeed = saveRoadSpeed;

    // set background music
    backgroundMusic.stop();
    backgroundMusic = gameMusicGrass;
    backgroundMusic.loop();

    if (!muted)
        backgroundMusic.setVolume(1);
    else
        backgroundMusic.setVolume(0);

    // reset wildcat
    wildcat.x = 100;

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
    lastBackgroundObject.x = 0;
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


