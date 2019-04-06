import * as PIXI from "pixi.js";
import initRenderer from "./utils/initRenderer";
import preloadResources from "./utils/preloadResources";
import Menu from "./menu-cont";
import Cards from "./cards-cont";
import Fire from "./fire-cont";
import Imgtxt from "./imgtxt-cont";
import D from './utils/display';

let stage, cardsCont, fireCont, ImgtxtCont, menuCont, bg, fpsText;

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

    bg = new PIXI.Sprite(PIXI.loader.resources["images/background_01.jpg"].texture);
    
    fpsText = new PIXI.Text("0", { fontSize: 16, fill: "#fff" });
    
    stage = new PIXI.Container();
    
    stage.addChild(bg);
    stage.addChild(fpsText);
    
    onResize(stage, renderer);
    window.addEventListener('resize', () => onResize(stage, renderer));
    
    bg.position.set(D.LEFT, D.TOP);
    bg.width = D.TOTAL_WIDTH;
    bg.height = D.TOTAL_HEIGHT;

    cardsCont = new Cards(stage);
    ImgtxtCont = new Imgtxt(stage);
    fireCont = new Fire(stage);

    const menuData = {
        cards: {
            x: D.CENTER_X,
            y: D.CENTER_Y + 10,
            text: "Cards Performance Test",
            ref: cardsCont,
        },
        imgtxt: {
            x: D.CENTER_X,
            y: D.CENTER_Y + 100,
            text: "Text & Images util",
            ref: ImgtxtCont,
        },
        fire: {
            x: D.CENTER_X,
            y: D.CENTER_Y + 190,
            text: "Fire library",
            ref: fireCont,
        },
    };
    menuCont = new Menu(stage, menuData);

    stage.addChild(cardsCont);
    stage.addChild(ImgtxtCont);
    stage.addChild(fireCont);
    stage.addChild(menuCont);

    const title = new PIXI.Sprite(PIXI.loader.resources["images/GUI.json"].textures["title.png"]);
    title.position.set(D.CENTER_X, D.TOP + 10);
    title.anchor.x = 0.5;

    const tittleText = new PIXI.Text('PixiJS Test', {
        fontFamily: 'Garamond',
        fontSize: 46,
        fill: '#261909',
        fontWeight: 'bold'
    });
    tittleText.anchor.set(0.5);
    tittleText.position.set(0, title.height / 3.3);

    title.addChild(tittleText);
    stage.addChild(title);

    stage.state = menuCont;

    update(-1, renderer);
};

// Initialisation
window.addEventListener("load", () => {
    const resources = [
        "images/atlas.json",
        "images/GUI.json",
        "images/background_01.jpg",
    ];
    preloadResources(resources, () => {
        setup();
    });
});
