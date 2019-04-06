import * as PIXI from "pixi.js";
import Card from "./cards/card-spr";
import D from "./utils/display";
import Btn from "./button-spr";

let cfg;

export default class Cards extends PIXI.Container {
    constructor(parent) {
        super();

        this.name = "cards";

        cfg = this.cfg = {
            deckSize: 144,
            leftStackX: D.LEFT + 120,
            rightStackX: D.RIGHT - 120,
            topY: 50,
            offset: 0,
            gap: 1.5,
            delay: 1000,
            duration: 2000,
        };

        parent.addChild(this);
        
        const leftCont = this.leftCont = new PIXI.Container();
        leftCont.name = "leftCont";
        this.addChild(leftCont);
        const rightCont = this.rightCont = new PIXI.Container();
        rightCont.name = "rightCont";
        this.addChild(rightCont);

        // TODO: pool util
        this.animatedCards = [];

        const textures = PIXI.loader.resources["images/atlas.json"].textures;
        const texKeys = Object.keys(textures);
        const cardTotal = texKeys.length;
        
        for (let i = 0; i < cfg.deckSize; i++) {
            const sprCard = new Card(cfg.leftStackX, cfg.topY + cfg.offset, textures[texKeys[i % cardTotal]]);
            sprCard.anchor.set(0.5, 0);
            leftCont.addChild(sprCard);
            cfg.offset += cfg.gap;
        }
        cfg.offset = 0;

        // BACK BTN
        const backBtn = this.backBtn = new Btn(0, 0, () => this.stop());
        backBtn.position.set(D.RIGHT - (backBtn.width / 2) - 20, D.BOTTOM - (backBtn.height / 2) - 20);
        this.addChild(backBtn);

        this.visible = false;
    }

    update() {
        this.animatedCards.forEach(card => {
            card.update();
        });
    }

    start() {
        this.visible = true;
        setTimeout(() => {
            this.draftCard();
        }, cfg.delay);
    }

    stop() {
        this.visible = false;
        const menu = this.parent.getChildByName("menu");
        menu.start();
    }

    draftCard() {
        if (this.visible) {
            const { leftCont, rightCont, animatedCards } = this;
            const lastIndex = leftCont.children.length - 1;
            const card = lastIndex >= 0 ? leftCont.getChildAt(lastIndex) : null;
    
            if (card !== null) {
                animatedCards.push(card);
                leftCont.removeChild(card);
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
}
