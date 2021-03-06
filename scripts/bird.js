const BIRD_FRAME_TIME = 0.2;

class Bird {

    constructor(x, y, size, frames, enabled) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.enabled = enabled;

        this.currentFrame = 0;
        this.frames = frames;
        this.frameTime = BIRD_FRAME_TIME;
        lastObstacle = this;

        this.randomOffset = random(-800, -300);
    }

    show() {
        image(this.frames[this.currentFrame], this.x, this.y, this.size, this.size);
    }

    update() {
        if (!this.enabled)
            return;

        this.frameTime -= 1/60;
        if (this.frameTime <= 0) {
            this.currentFrame = (this.currentFrame == 0) ? 1 : 0;
            this.frameTime = BIRD_FRAME_TIME;
        }

        this.x += roadSpeed;

        if (this.x < this.randomOffset && objectReset) {
            const xoff = random(400, 550);
            this.x = lastObstacle.x + xoff;
            lastObstacle = this;
            this.randomOffset = random(-2400, -400);
        }

        // check collision
        if (wildcat.x > this.x - this.size/2 && wildcat.x < this.x + this.size/2 &&
            wildcat.y > this.y - this.size/2 && wildcat.y < this.y + this.size/2) {
            gameOver();
        }
    }

}