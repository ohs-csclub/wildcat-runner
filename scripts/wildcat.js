const WILDCAT_FRAME_TIME = 0.2;
const GRAVITY = 0.5;
const WILDCAT_VERTICAL_CONSTRAINT_FACTOR = 0.86;
const MAX_JUMPS = 1;

class Wildcat {

    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.yvel = 0;
        this.jumps = 1;

        this.size = size;
        this.frame = 0;
        this.frameTime = WILDCAT_FRAME_TIME;
    }

    show() {
        if (this.yvel < 0 || this.jumps <= 0)
            this.frame = 0;

        image(wildcatFrames[this.frame], this.x, this.y, this.size, this.size);
    }

    update() {
        if (this.yvel >= 0) {
            this.frameTime -= 1/60;
            if (this.frameTime <= 0) {
                this.frame = (this.frame == 1) ? 0 : 1;
                this.frameTime = WILDCAT_FRAME_TIME;
            }
        }

        this.y += this.yvel;
        this.yvel += GRAVITY;

        if (this.y >= height*WILDCAT_VERTICAL_CONSTRAINT_FACTOR) {
            this.jumps = MAX_JUMPS;
        }
        this.y = constrain(this.y, this.size, height*WILDCAT_VERTICAL_CONSTRAINT_FACTOR);
    }

    jump() {
        if (this.jumps <= 0) return;

        this.yvel = -12;
        this.jumps--;
        jumpSound.play();
    }

}