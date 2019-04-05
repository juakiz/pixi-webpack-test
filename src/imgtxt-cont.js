import * as PIXI from "pixi.js";
import ImgTxtUtil from "./imgtxt/imgtxt-util";

export default class Imgtxt extends PIXI.Container {
    constructor(parent) {
        super();

        this.name = "imgtxt";

        parent.addChild(this);

        const wordsNimages = [
            ["Lorem", "ipsum", "dolor", "sit"],
            ["AS.png", "AD.png", "AH.png", "AC.png"]
        ];
        let string = "";

        for (let i = 0; i < 4; i++) {
            const rndIndex = Math.round(Math.random());
            string += " " + wordsNimages[rndIndex].pop();
        }

        this.richText = new ImgTxtUtil(string);
    }

    start() {

    }
  }
