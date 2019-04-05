import * as PIXI from "pixi.js";

export default class Btn extends PIXI.Graphics {
    constructor(x, y, text, dim, callback) {
        super();

        this.lineStyle(4, 0xFF3300, 1);
        this.beginFill(0x66CCFF);
        this.drawRoundedRect(dim.x, dim.y, dim.width, dim.height);
        this.endFill();
        this.x = x;
        this.y = y;

        const style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 16,
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
        this.addChild(textObj);

        this.interactive = true;

        this.on('pointerdown', callback);
    }
  }
