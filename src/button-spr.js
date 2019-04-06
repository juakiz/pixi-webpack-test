import * as PIXI from "pixi.js";

export default class Btn extends PIXI.Sprite {
    constructor(x, y, callback) {
        super(PIXI.loader.resources["images/GUI.json"].textures["button_04.png"]);

        this.anchor.set(0.5);

        this.x = x;
        this.y = y;

        this.interactive = true;
        this.on('pointerdown', callback);
    }
  }
