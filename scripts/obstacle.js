let lastObstacle;

class Obstacle {

    constructor(x, y, size, frame) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.frame = frame;
        lastObstacle = this;
    }

    show() {
        image(this.frame, this.x, this.y, this.size, this.size);
    }

    update() {
        this.x += roadSpeed;

        if (this.x < -this.size) {
            const xoff = random(600, 1200);
            this.x = lastObstacle.x + xoff;
            lastObstacle = this;
        }

        // check collision
        if (wildcat.x > this.x - this.size/2 && wildcat.x < this.x + this.size/2 &&
            wildcat.y > this.y - this.size/2 && wildcat.y < this.y + this.size/2) {
            gameOver();
        }
    }

}
