import * as PIXI from "pixi.js";
import D from "./utils/display";

export default class Menu extends PIXI.Container {
    constructor(parent, data) {
        super();

        this.name = "menu";

        parent.addChild(this);

        
        const banner = new PIXI.Sprite(PIXI.loader.resources["images/GUI.json"].textures["banner_01.png"]);
        banner.position.set(D.CENTER_X, D.TOP);
        banner.anchor.x = 0.5;
        this.addChild(banner);

        const badge = new PIXI.Sprite(PIXI.loader.resources["images/GUI.json"].textures["Tex_badge_35.PNG"]);
        badge.position.set(D.CENTER_X, D.TOP + 180);
        badge.anchor.set(0.5);
        this.addChild(badge);

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
        const button = new PIXI.Sprite(PIXI.loader.resources["images/GUI.json"].textures["Plank_07.png"]);
        button.anchor.set(0.5);
        button.x = x;
        button.y = y;
        this.addChild(button);

        const style = new PIXI.TextStyle({
            fontFamily: "Garamond",
            fontSize: 36,
            fontWeight: 900,
            fill: "#FFE600",
            stroke: '#381509',
            strokeThickness: 3,
            dropShadow: true,
            dropShadowColor: "#303030",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 4,
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
