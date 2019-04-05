import * as PIXI from "pixi.js";
import Btn from "./button-grap";
import D from "./utils/display";

export default class Fire extends PIXI.Container {
    constructor(parent) {
        super();

        this.name = "fire";

        parent.addChild(this);

        // BACK BTN
        const btnDim = { x: -40, y: -30, width: 80, height: 60 };
        const backBtn = this.backBtn = new Btn(0, 0, "Back", btnDim, () => this.stop());
        backBtn.position.set(D.RIGHT - (backBtn.width / 2) - 20, D.BOTTOM - (backBtn.height / 2) - 20);
        this.addChild(backBtn);

        this.visible = false;
    }

    start() {
        this.visible = true;
    }

    stop() {
        this.visible = false;
        const menu = this.parent.getChildByName("menu");
        if (this.timer) clearTimeout(this.timer);
        menu.start();
    }
}
