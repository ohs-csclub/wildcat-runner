window.addEventListener('resize', () => {
    const w = window.innerWidth * .8;
    const h = window.innerHeight * .8;
    resizeCanvas(w, h);
});

document.addEventListener('visibilitychange', (e) => {
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
    if (!started)
        return;

    // pause
    if (pauseButton.classList.contains('fa-pause')) {
        pauseButton.classList.remove('fa-pause');
        pauseButton.classList.add('fa-play');

        pause(true);
    // unpause
    } else {
        pauseButton.classList.remove('fa-play');
        pauseButton.classList.add('fa-pause');

        pause(false);
    }
});


// on load
muted = localStorage.getItem('muted') == 'true';
if (muted) {
    button.classList.remove('fa-volume-high');
    button.classList.add('fa-volume-xmark');
}

