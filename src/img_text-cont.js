import * as PIXI from "pixi.js";
// import Card from "./cards/card-spr";

export default class ImgText extends PIXI.Container {
    constructor(parent) {
        super();

        parent.addChild(this);
    }
  }
