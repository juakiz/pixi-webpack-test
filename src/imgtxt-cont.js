import * as PIXI from "pixi.js";
import ImgTxtUtil from "./imgtxt/imgtxt-util";
import D from "./utils/display";
import Btn from "./button-grap";

export default class Imgtxt extends PIXI.Container {
    constructor(parent) {
        super();

        this.name = "imgtxt";

        parent.addChild(this);

        this.ranges = { fontSize: [10, 26], words: [3, 16] };
        this.data = [
            ["Lorem", "ipsum", "dolor", "sit"],
            ["img#AS.png", "img#AD.png", "img#AH.png", "img#AC.png"]
        ];

        // BACK BTN
        const btnDim = { x: -40, y: -30, width: 80, height: 60 };
        const backBtn = this.backBtn = new Btn(0, 0, "Back", btnDim, () => this.stop());
        backBtn.position.set(D.RIGHT - (backBtn.width / 2) - 20, D.BOTTOM - (backBtn.height / 2) - 20);
        this.addChild(backBtn);

        this.visible = false;
    }

    update() {

    }

    start() {
        this.visible = true;
        this.richText = this.createRandomPhrase();
    }

    stop() {
        this.visible = false;
        const menu = this.parent.getChildByName("menu");
        if (this.timer) clearTimeout(this.timer);
        this.richText.destroy();
        menu.start();
    }

    createRandomPhrase() {
        if (!this.visible) return;

        const { ranges, data } = this;
        const randomNumber = this.randomBtwn(ranges.words[1], ranges.words[0]);

        let string = "";
        for (let i = 0; i < randomNumber; i++) {
            const rndY = this.randomBtwn(0, data.length);
            const rndX = this.randomBtwn(0, data[rndY].length);
            string += " " + data[rndY][rndX];
        }

        const richText = new ImgTxtUtil(string, this.randomBtwn(ranges.fontSize[0], ranges.fontSize[1]));
        richText.position.set(D.CENTER_X - (richText.width / 2), D.CENTER_Y - (richText.height / 2));
        this.addChild(richText);

        this.timer = setTimeout(() => {
            this.richText.destroy();
            this.richText = this.createRandomPhrase(ranges, data);
        }, 2000);

        return richText;
    }

    randomBtwn(min, max) {
        return Math.floor((Math.random() * max) + min);
    }
}
