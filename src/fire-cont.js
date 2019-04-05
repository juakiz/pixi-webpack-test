import * as PIXI from "pixi.js";
import * as particles from 'pixi-particles';
import Btn from "./button-grap";
import D from "./utils/display";

let emitter, elapsed, now;

export default class Fire extends PIXI.Container {
    constructor(parent) {
        super();

        this.name = "fire";

        parent.addChild(this);

        emitter = new particles.Emitter(
            this,
            ["images/fire1.png", "images/fire2.png", "images/fire3.png", ],
            {
                "alpha": {
                    "start": 1,
                    "end": 0
                },
                "scale": {
                    "start": 4,
                    "end": 6
                },
                "color": {
                    "start": "fff191",
                    "end": "ff622c"
                },
                "speed": {
                    "start": 50,
                    "end": 50
                },
                "startRotation": {
                    "min": 265,
                    "max": 275
                },
                "rotationSpeed": {
                    "min": 50,
                    "max": 50
                },
                "lifetime": {
                    "min": 1.3,
                    "max": 3
                },
                "blendMode": "add",
                "frequency": 0.2,
                "emitterLifetime": 0,
                "maxParticles": 10,
                "pos": {
                    "x": 0,
                    "y": 0
                },
                "addAtBack": false,
                "spawnType": "circle",
                "spawnCircle": {
                    "x": 0,
                    "y": 0,
                    "r": 3
                }
            }
        );

        emitter.updateSpawnPos(D.CENTER_X, D.CENTER_Y);

        elapsed = Date.now();

        // BACK BTN
        const btnDim = { x: -40, y: -30, width: 80, height: 60 };
        const backBtn = this.backBtn = new Btn(0, 0, "Back", btnDim, () => this.stop());
        backBtn.position.set(D.RIGHT - (backBtn.width / 2) - 20, D.BOTTOM - (backBtn.height / 2) - 20);
        this.addChild(backBtn);

        this.visible = false;
    }

    update() {
        now = Date.now();
        emitter.update((now - elapsed) * 0.001);
        elapsed = now;
    }

    start() {
        this.visible = true;
        emitter.emit = true;
    }

    stop() {
        this.visible = false;
        emitter.emit = false;
        const menu = this.parent.getChildByName("menu");
        menu.start();
    }
}
