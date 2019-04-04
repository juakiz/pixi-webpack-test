import * as PIXI from "pixi.js";
import initRenderer from "./initRenderer";
import preloadResources from "./preloadResources";
import getTexture from "./getTexture";

let stage, cardSprite, fpsText, deltaTime = Date.now();
let hSpeed = 3, vSpeed = 2, delay = 0;

const update = (time, renderer) => {
    requestAnimationFrame(t => update(t, renderer));

    cardSprite.x += hSpeed;
    cardSprite.y += vSpeed;

    if (cardSprite.x <= 0 || cardSprite.x + cardSprite.width >= renderer.view.width)
        hSpeed *= -1;

    if (cardSprite.y <= 0 || cardSprite.y + cardSprite.height >= renderer.view.height)
        vSpeed *= -1;
        
    renderer.render(stage);

    const timestamp = Date.now();
    const FPS = 1000 / (timestamp - deltaTime);
    deltaTime = timestamp;

    delay += FPS;
    if (delay > 300 && FPS < 100) {
        fpsText.text = `FPS: ${FPS.toFixed(2)}`;
        delay = 0;
    }
};

const setup = () => {

    const renderer = initRenderer();

    stage = new PIXI.Container();

    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 16,
        fill: "#fff",
    });

    fpsText = new PIXI.Text("0", style);
    fpsText.x = 10;
    fpsText.y = 10;

    const cardTexture = getTexture("2C.png");
    cardSprite = new PIXI.Sprite(cardTexture);

    cardSprite.position.set(0, 0);
    // cardSprite.position.set(renderer.view.width - cardSprite.width, renderer.view.height - cardSprite.height);

    stage.addChild(cardSprite);
    stage.addChild(fpsText);

    update(-1, renderer);
};

// Initialisation
window.addEventListener("load", () => {
    const resources = ["images/atlas.json"];
    preloadResources(resources, () => {
        setup();
    });
});
