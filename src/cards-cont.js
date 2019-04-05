import * as PIXI from "pixi.js";
import Card from "./cards/card-spr";
import D from "./utils/display";

let cfg;

export default class Cards extends PIXI.Container {
    constructor(parent) {
        super();

        cfg = this.cfg = {
            deckSize: 144,
            leftStackX: D.LEFT + 120,
            rightStackX: D.RIGHT - 120,
            topY: 50,
            offset: 0,
            gap: 2,
            delay: 1000,
            duration: 2000,
        };

        parent.addChild(this);
        
        const leftCont = this.leftCont = new PIXI.Container();
        this.addChild(leftCont);
        const rightCont = this.rightCont = new PIXI.Container();
        this.addChild(rightCont);

        // TODO: pool util
        this.animatedCards = [];

        const textures = PIXI.loader.resources["images/atlas.json"].textures;
        const textureKeys = Object.keys(textures);
        const cardAmount = textureKeys.length;
        
        for (let i = 0; i < cfg.deckSize; i++) {
            const sprCard = new Card(cfg.leftStackX, cfg.topY + cfg.offset, textures[textureKeys[i % cardAmount]]);
            sprCard.anchor.set(0.5, 0);
            leftCont.addChild(sprCard);
            cfg.offset += cfg.gap;
        }
        cfg.offset = 0;

        setTimeout(() => {
            this.draftCard();
        }, cfg.delay);
    }

    update() {
        this.animatedCards.forEach(card => {
            card.update();
        });
    }

    draftCard() {
        const { leftCont, rightCont, animatedCards } = this;
        const lastIndex = leftCont.children.length - 1;
        const card = lastIndex >= 0 ? leftCont.getChildAt(lastIndex) : null;

        if (card !== null) {
            animatedCards.push(card);
            rightCont.addChild(card);
            card.moveTo(cfg.rightStackX, cfg.topY + cfg.offset, cfg.duration);
            cfg.offset += cfg.gap;
            setTimeout(() => {
                this.draftCard();
            }, cfg.delay);
        }
        else cfg.offset = 0;
    }
  }
