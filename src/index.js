import * as PIXI from "pixi.js";
import initRenderer from "./utils/initRenderer";
import preloadResources from "./utils/preloadResources";
import Menu from "./menu-cont";
import Cards from "./cards-cont";
import Fire from "./fire-cont";
import Imgtxt from "./imgtxt-cont";
import D from './utils/display';

let stage, cardsCont, fireCont, ImgtxtCont, menuCont, fpsText;

const update = (time, renderer) => {
    requestAnimationFrame(t => update(t, renderer));

    renderer.render(stage);

    stage.state.update();

    fpsText.text = `FPS: ${PIXI.ticker.shared.FPS.toFixed(2)}`;
};

const onResize = (stage, renderer) => {
    D.refreshSizes();
    D.letterBoxCont(stage);
    renderer.resize(window.innerWidth, window.innerHeight);
    fpsText.position.set(D.LEFT + 10, D.TOP + 10);
};

const setup = () => {
    const renderer = initRenderer();

    fpsText = new PIXI.Text("0", { fontSize: 16, fill: "#fff" });

    stage = new PIXI.Container();

    stage.addChild(fpsText);

    onResize(stage, renderer);
    window.addEventListener('resize', () => onResize(stage, renderer));

    cardsCont = new Cards(stage);
    ImgtxtCont = new Imgtxt(stage);
    fireCont = new Fire(stage);

    const menuData = {
        cards: {
            x: D.CENTER_X,
            y: D.CENTER_Y - 120,
            text: "Cards Performance Test",
            ref: cardsCont,
        },
        fire: {
            x: D.CENTER_X,
            y: D.CENTER_Y,
            text: "Fire library",
            ref: ImgtxtCont,
        },
        imgtxt: {
            x: D.CENTER_X,
            y: D.CENTER_Y + 120,
            text: "Text & Images util",
            ref: fireCont,
        },
    };
    menuCont = new Menu(stage, menuData);

    stage.addChild(cardsCont);
    stage.addChild(ImgtxtCont);
    stage.addChild(fireCont);
    stage.addChild(menuCont);

    // stage.state = cardsCont;
    stage.state = menuCont;

    update(-1, renderer);
};

// Initialisation
window.addEventListener("load", () => {
    const resources = ["images/atlas.json"];
    preloadResources(resources, () => {
        setup();
    });
});
