import * as PIXI from "pixi.js";
// import Card from "./cards/card-spr";

export default class Fire extends PIXI.Container {
    constructor(parent) {
        super();

        this.name = "fire";

        parent.addChild(this);
    }

    start() {

    }
  }
