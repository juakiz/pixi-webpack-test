const Display = {
    REAL_WIDTH: 0,
    REAL_HEIGHT: 0,
    BASE_WIDTH: 640,
    BASE_HEIGHT: 640,
    LEFT: 0,
    RIGHT: 0,
    TOP: 0,
    BOTTOM: 0,
    SCALE: 1,
    CONTENT: document.getElementById('main'),

    RefreshSizes: function () {
        Display.CONTENT = document.getElementById('main');

        let DPR = 1;
        if (window.screen.systemXDPI !== undefined
            && window.screen.logicalXDPI !== undefined
            && window.screen.systemXDPI > window.screen.logicalXDPI)
            DPR = window.screen.systemXDPI / window.screen.logicalXDPI;
        else if (window.devicePixelRatio !== undefined) DPR = window.devicePixelRatio;

        Display.REAL_WIDTH = DPR * document.body.clientWidth;
        Display.REAL_HEIGHT = DPR * document.body.clientHeight;

        const scale = {
            x: Display.REAL_WIDTH / Display.BASE_WIDTH,
            y: Display.REAL_HEIGHT / Display.BASE_HEIGHT
        };

        Display.SCALE = Math.min(scale.x, scale.y);
        const INVS = 1 / Display.SCALE;

        Display.CENTER_X = Display.BASE_WIDTH / 2;
        Display.CENTER_Y = Display.BASE_HEIGHT / 2;
        Display.LEFT = -((Display.REAL_WIDTH / 2) - Display.CENTER_X * Display.SCALE) * INVS;
        Display.RIGHT = -Display.LEFT + Display.BASE_WIDTH;
        Display.TOP = -((Display.REAL_HEIGHT / 2) - Display.CENTER_Y * Display.SCALE) * INVS;
        Display.BOTTOM = -Display.TOP + Display.BASE_HEIGHT;
        Display.WIDTH = Display.RIGHT - Display.LEFT;
        Display.HEIGHT = Display.BOTTOM - Display.TOP;
    },

    letterBoxView: function (view) {
        view.scale.set(Display.SCALE);
        view.x = (Display.REAL_WIDTH / 2) - (Display.CENTER_X * Display.SCALE);
        view.y = (Display.REAL_HEIGHT / 2) - (Display.CENTER_Y * Display.SCALE);
    }
};

export default Display;
