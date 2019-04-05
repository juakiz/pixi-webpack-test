import * as PIXI from "pixi.js";

export default class Card extends PIXI.Sprite {
    constructor(x, y, texture) {
        super(texture);

        this.setPosition(x, y);
    }

    moveTo(x, y, time) {
        this.targetX = x;
        this.targetY = y;
        this.delay = time;

        const timestamp = Date.now();

        this.timeStart = timestamp;
        this.timeEnd = timestamp + this.delay;
        this.moving = true;
    }

    setPosition(x, y) {
        this.x = this.X0 = this.targetX = x;
        this.y = this.Y0 = this.targetX = y;
        this.Scale0 = 0.8;
        this.scale.set(this.Scale0);
        this.moving = false;
    }

    update() {
        const { targetX, targetY, Scale0, timeStart, delay } = this;
        if (this.moving) {
            const timestamp = Date.now();
            if (timestamp < this.timeEnd) {
                const t = (timestamp - timeStart) / delay;

                this.x = this.lerp(this.X0, targetX, t);
                this.y = this.lerp(this.Y0, targetY, t);

                const scaleInc = 0.6;
                this.scale.x = this.scale.y = t < 0.5
                    ? Scale0 + (t * scaleInc)
                    : (Scale0 + scaleInc) - (t * scaleInc);
            }
            else {
                this.X0 = this.x = targetX;
                this.Y0 = this.y = targetY;
                this.scale.set(this.Scale0);
                this.moving = false;
                this.parent.parent.animatedCards.shift();
            }
        }
    }

    lerp(v0, v1, t) {
        return (1 - t) * v0 + t * v1;
    }
  }
