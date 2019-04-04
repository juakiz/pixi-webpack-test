import * as PIXI from "pixi.js";
import Card from "./cards/card-spr";
import D from "./utils/display";

const LEFT_X = 120;
const RIGHT_X = 520;

export default class Cards extends PIXI.Container {
    constructor(parent) {
        super();

        parent.addChild(this);
        
        const leftCont = this.leftCont = new PIXI.Container();
        this.addChild(leftCont);
        const rightCont = this.rightCont = new PIXI.Container();
        this.addChild(rightCont);

        this.cards = [];
        
        const textures = PIXI.loader.resources["images/atlas.json"].textures;
        const textureKeys = Object.keys(textures);
        const cardAmount = textureKeys.length;
        let offset = 0;
        
        for (let i = 0; i < 144; i++) {
            const sprCard = new Card(LEFT_X, 50 + offset, textures[textureKeys[i % cardAmount]]);
            sprCard.anchor.set(0.5, 0);
            leftCont.addChild(sprCard);
            this.cards.push(sprCard);
            offset++;
        }
    }

    update() {
        // this.leftCont.children.forEach(card => {
        //     card.update();
        // });
    }
  }
