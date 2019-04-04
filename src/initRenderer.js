import * as PIXI from "pixi.js";

/**
 *  Creates the Renderer
 *
 *  @returns {PIXIRenderer}
 */
const initRenderer = () => {
    const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
        antialias: false,
        transparent: false,
        resolution: 1
    });

    renderer.view.className = "renderArea";

    document.getElementById("main").appendChild(renderer.view);

    return renderer;
};

export default initRenderer;
