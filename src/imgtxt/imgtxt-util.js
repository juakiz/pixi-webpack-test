/**
 * A PixiJS Container extension to easily make images mixed with text.
 * You need to add the characters 'img#' before the name of the file to include the image.
 * 
 * @extends PIXI.Container
 */
import * as PIXI from "pixi.js";

export default class imgTxtUtil extends PIXI.Container {
    /**
     * Mix text with images.
     * @constructor
     * @param {string} text - Full text string with words and the key characters following filenames.
     * @param {Number} fotnSize - Text (and images) size.
     */
    constructor(text, fotnSize) {
        super();
        
        // TODO (?): Wordwrap?
        this.style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: fotnSize,
            fill: "white",
        });

        const textArray = text.split(" ");

        textArray.forEach(el => {
            if (el.includes("img#")) {
                const key = el.slice(4);
                this.appendImg(key);
            }
            else {
                const string = `${el} `;
                this.appendText(string);
            }
        });

        // maybe in real life:
        // this.cacheAsBitmap = true;
    }

    createText(text) {
        const textObj = new PIXI.Text(text, this.style);
        textObj.anchor.y = 1;
        return textObj;
    }

    appendText(string) {
        const text = this.createText(string);
        text.x = this.width;
        this.addChild(text);
    }

    createImg(key) {
        const spriteObj = new PIXI.Sprite(PIXI.loader.resources["images/atlas.json"].textures[key]);
        spriteObj.anchor.y = 1;
        return spriteObj;
    }

    appendImg(key) {
        const sprite = this.createImg(key);
        sprite.x = this.width;
        sprite.height = this.style.fontSize;
        sprite.scale.x = sprite.scale.y;
        this.addChild(sprite);
        this.appendText(" ");
    }
}
