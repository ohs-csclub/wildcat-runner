// determines the settings to use depending on screen size
function determineSizes() {
    if (window.innerWidth < 640)
        currentSizing = sizes["small"];
    else if (window.innerWidth <= 1007)
        currentSizing = sizes["medium"];
    else if (window.innerWidth > 1007)
        currentSizing = sizes["large"];
}

// returns a random integer
function randInt(min, max) {
    return Math.floor(random(min, max));
}

// tool to return a promise; used to delay an async function
function timeout(ms) {
    return new Promise(res => setTimeout(res, ms));
}
