let objectMinHeight = .34;
let objectMaxHeight = .72;

class BackgroundObject {

    constructor(x, y, velx, size, frame) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.frame = frame;
        this.velx = velx;
    }

    show() {
        image(this.frame, this.x, this.y, this.size, this.size);
    }

    update() {
        this.x += this.velx;

        if (this.x < -200) {
            this.x = width*2;
            this.y = random(height*objectMinHeight, height*objectMaxHeight);
        }
    }

}