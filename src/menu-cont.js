import * as PIXI from "pixi.js";
import D from "./utils/display";

export default class Menu extends PIXI.Container {
    constructor(parent, data) {
        super();

        this.name = "menu";

        parent.addChild(this);

        this.buttons = Object.keys(data).map(i => {
            return this.makeButton(data[i].x, data[i].y, data[i].text, data[i].ref);
        });
    }

    update() {

    }

    start() {
        this.visible = true;
        this.parent.state = this;
    }

    stop() {
        this.visible = false;
    }

    makeButton(x, y, text, ref) {
        const button = new PIXI.Graphics();

        button.lineStyle(4, 0xFF3300, 1);
        button.beginFill(0x66CCFF);
        button.drawRoundedRect(-(D.TOTAL_WIDTH * 0.3), -40, D.TOTAL_WIDTH * 0.6, 80, 10);
        button.endFill();
        button.x = x;
        button.y = y;
        this.addChild(button);

        const style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 32,
            fill: "white",
            stroke: '#ff3300',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        });

        const textObj = new PIXI.Text(text, style);
        textObj.anchor.set(0.5);
        button.addChild(textObj);

        button.interactive = true;

        button.on('pointerdown', () => {
            this.visible = false;
            this.parent.state = ref;
            ref.start();
        });

        return button;
    }
}
