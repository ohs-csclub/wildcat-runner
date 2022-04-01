let objectMinHeight = .34;
let objectMaxHeight = .72;
let lastBackgroundObject;

class BackgroundObject {

    constructor(x, y, velx, s, frames) {
        this.x = x;
        this.y = y;
        this.size = s;
        this.velx = velx;
        this.frames = frames;
        this.frame = frames[ randInt(0, frames.length) ]

        lastBackgroundObject = this;
    }

    show() {
        image(this.frame, this.x, this.y, this.frame.width*this.size, this.frame.height*this.size);
    }

    update() {
        this.x += this.velx;

        if (this.x < -this.frame.width*this.size && objectReset) {
            const offset = random(width, width*currentSizing["bgObjVariance"])
            this.x = lastBackgroundObject.x + lastBackgroundObject.frame.width*lastBackgroundObject.size + offset;
            this.y = random(height*currentSizing["bgObjYMin"], height*currentSizing["bgObjYMax"]);
            this.frame = this.frames[ randInt(0, this.frames.length) ];
            lastBackgroundObject = this;
        }
    }

}