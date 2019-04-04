import * as PIXI from "pixi.js";

export default class Card extends PIXI.Sprite {
    constructor(x, y, texture) {
        super(texture);

        this.position.set(x, y);

        this.initialX = this.targetX = x;
        this.initialY = this.targetX = y;
        this.moving = false;
    }

    moveTo(x, y, time) {
        this.targetX = x;
        this.targetY = y;
        this.delay = time;

        this.END_TIME = Date.now() + this.delay;
        this.moving = true;
    }

    update() {
        if (this.moving && Date.now() < this.END_TIME) {
            const t = Date.now() / this.END_TIME;

            this.x = this.lerp(this.initialX, this.targetX, t);
            this.y = this.lerp(this.initialY, this.targetY, t);

            this.scale.x = this.scale.y = t < 0.5 ? (1 + t) * 0.5 : (1.5 - t) * 0.5;
        }
        else if (this.moving) {
            this.initialX = this.x = this.targetX;
            this.initialY = this.y = this.targetY;
            this.moving = false;
        }
    }

    lerp(v0, v1, t) {
        return (1 - t) * v0 + t * v1;
    }
  }
