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


// on load
muted = localStorage.getItem('muted') == 'true';
if (muted) {
    button.classList.remove('fa-volume-high');
    button.classList.add('fa-volume-xmark');
}

