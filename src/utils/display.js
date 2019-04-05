const Display = {
    REAL_WIDTH: 0,
    REAL_HEIGHT: 0,
    INNER_WIDTH: 640,
    INNER_HEIGHT: 640,
    LEFT: 0,
    RIGHT: 0,
    TOP: 0,
    BOTTOM: 0,
    SCALE: 1,
    refreshSizes: function () {
        Display.REAL_WIDTH = document.body.clientWidth;
        Display.REAL_HEIGHT = document.body.clientHeight;
        const scale = {
            x: Display.REAL_WIDTH / Display.INNER_WIDTH,
            y: Display.REAL_HEIGHT / Display.INNER_HEIGHT
        };

        Display.SCALE = Math.min(scale.x, scale.y);
        const INVS = 1 / Display.SCALE;

        Display.CENTER_X = Display.INNER_WIDTH / 2;
        Display.CENTER_Y = Display.INNER_HEIGHT / 2;
        Display.LEFT = -((Display.REAL_WIDTH / 2) - Display.CENTER_X * Display.SCALE) * INVS;
        Display.RIGHT = -Display.LEFT + Display.INNER_WIDTH;
        Display.TOP = -((Display.REAL_HEIGHT / 2) - Display.CENTER_Y * Display.SCALE) * INVS;
        Display.BOTTOM = -Display.TOP + Display.INNER_HEIGHT;
        Display.TOTAL_WIDTH = Display.RIGHT - Display.LEFT;
        Display.TOTAL_HEIGHT = Display.BOTTOM - Display.TOP;
    },

    letterBoxCont: function (container) {
        container.scale.set(Display.SCALE);
        container.x = (Display.REAL_WIDTH / 2) - (Display.CENTER_X * Display.SCALE);
        container.y = (Display.REAL_HEIGHT / 2) - (Display.CENTER_Y * Display.SCALE);
    }
};

export default Display;
