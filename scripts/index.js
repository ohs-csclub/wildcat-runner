// get elements
const modal = document.querySelector('.modal');


// when resized/changed orientation
window.addEventListener('resize', () => {
    const w = window.innerWidth * .8;
    const h = window.innerHeight * .8;
    resizeCanvas(w, h);

    pauseGame(true);

    if (window.innerHeight > window.innerWidth) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');

        determineSizes();
        
        // apply sizes
        wildcat.size = currentSizing["wildcatSize"];
        wildcat.y = height*currentSizing["wildcat"];
        bird.y = height*currentSizing["bird"];
        for (let o of obstacles) {
            if (scene == "tunnel") {
                o.y = height*currentSizing["cones"];
                o.size = currentSizing["coneSize"];
            }
            else {
                o.y = height*currentSizing["trees"]
                o.size = currentSizing["treeSize"];
            }
        }
    }
});

document.addEventListener('visibilitychange', (e) => {
    if (!backgroundMusic)
        return;

    if (paused)
        return;

    if (backgroundMusic.isPaused() && !paused)
        backgroundMusic.play();
    else if (backgroundMusic.isPlaying())
        backgroundMusic.pause();
})

const button = document.getElementById('music');
button.addEventListener('click', (e) => {
    // mute
    if (button.classList.contains('fa-volume-high')) {
        button.classList.remove('fa-volume-high');
        button.classList.add('fa-volume-xmark');

        backgroundMusic.setVolume(0);
        failSound.setVolume(0);
        jumpSound.setVolume(0);
        scoreSound.setVolume(0);

        muted = true;
        localStorage.setItem('muted', true);
    // unmute
    } else {
        button.classList.remove('fa-volume-xmark');
        button.classList.add('fa-volume-high');

        backgroundMusic.setVolume(1);
        failSound.setVolume(1);
        jumpSound.setVolume(1);
        scoreSound.setVolume(1);

        muted = false;
        localStorage.setItem('muted', false);
    }
})

const pauseButton = document.getElementById('pause');
pauseButton.addEventListener('click', () => {
    if (!started || over || transitioning)
        return;

    // pause
    if (pauseButton.classList.contains('fa-pause')) {
        pauseButton.classList.remove('fa-pause');
        pauseButton.classList.add('fa-play');

        pauseGame(true);
    // unpause
    } else {
        pauseButton.classList.remove('fa-play');
        pauseButton.classList.add('fa-pause');

        pauseGame(false);
    }
});


// on load
muted = localStorage.getItem('muted') == 'true';
if (muted) {
    button.classList.remove('fa-volume-high');
    button.classList.add('fa-volume-xmark');
}


// detect mobile orientation
if (window.innerHeight > window.innerWidth) {
    modal.classList.remove('hidden');
}




