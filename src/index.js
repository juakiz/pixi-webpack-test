import * as PIXI from "pixi.js";
import initRenderer from "./utils/initRenderer";
import preloadResources from "./utils/preloadResources";
// import Menu from "./menu-cont";
import Cards from "./cards-cont";
// import Fire from "./fire-cont";
// import ImgText from "./img_text-cont";
import D from './utils/display';

let stage, state, cardsCont, /* menuCont, fireCont, ImgTextCont, */ fpsText;

const update = (time, renderer) => {
    requestAnimationFrame(t => update(t, renderer));

    renderer.render(stage);

    state.update();

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

    // menuCont = new Menu(stage);
    cardsCont = new Cards(stage);
    // fireCont = new Fire(stage);
    // ImgTextCont = new ImgText(stage);

    // stage.addChild(menuCont);
    stage.addChild(cardsCont);
    // stage.addChild(fireCont);
    // stage.addChild(ImgTextCont);

    state = cardsCont;

    update(-1, renderer);
};

// Initialisation
window.addEventListener("load", () => {
    const resources = ["images/atlas.json"];
    preloadResources(resources, () => {
        setup();
    });
});
