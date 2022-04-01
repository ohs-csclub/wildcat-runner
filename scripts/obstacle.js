let lastObstacle;
let obstacleMinOff = 600;
let obstacleMaxOff = 800;

class Obstacle {

    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

        const randImg = randInt(0, 3);
        this.frame = obstacleImages[randImg];
        
        lastObstacle = this;
    }

    show() {
        image(this.frame, this.x, this.y, this.size, this.size);
    }

    update() {
        this.x += roadSpeed;

        if (this.x < -this.size && objectReset) {
            const xoff = random(obstacleMinOff, obstacleMaxOff);
            const randImg = randInt(0, 3);
            this.x = lastObstacle.x + xoff;
            this.frame = obstacleImages[randImg];
            lastObstacle = this;
        }

        // check collision
        if (wildcat.x > this.x - this.size/2 && wildcat.x < this.x + this.size/2 &&
            wildcat.y > this.y - this.size/2 && wildcat.y < this.y + this.size/2) {
            gameOver();
        }
    }

}
