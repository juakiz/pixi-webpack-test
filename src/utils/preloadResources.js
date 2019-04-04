import * as PIXI from "pixi.js";

const preloadResources = (resources, cb) => {
    PIXI.loader
        .add(resources)
        // .on("progress", loader => console.log(`${loader.progress}% completed`))
        .load(cb);
};

export default preloadResources;
