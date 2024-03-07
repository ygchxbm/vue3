var VueReactivity = (function (exports) {
    'use strict';

    const add = (x, y) => {
        return x + y;
    };

    const a = 1;
    let h = 100;
    console.info("b:", add(2, 3));

    exports.a = a;
    exports.h = h;

    return exports;

})({});
//# sourceMappingURL=reactivity.global.js.map
