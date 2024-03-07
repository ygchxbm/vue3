var Vue = (function (exports) {
    'use strict';

    function isObject(target) {
        return typeof target === 'object' && target !== null;
    }

    const get = createGetter();
    const readonlyGet = createGetter(false, true);
    const set = createSetter();
    function createGetter(isShallow = false, isReadonly = true) {
        return function get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver);
            if (isShallow) {
                return res;
            }
            else {
                if (isObject(res)) {
                    //key对应的value 是对象，要递归,且已经不是浅的
                    //性能优化 懒代理
                    return isReadonly ? readonly(res) : reactive(res);
                }
            }
        };
    }
    function createSetter(isShallow = false) {
        return function set() {
        };
    }
    const reactiveHandler = {
        get,
        set
    };
    const readonlyHandler = {
        get: readonlyGet,
        set: (target, key, value) => {
            console.error("set on key is failed");
        }
    };

    function reactive(target) {
        return createReactObj(target, false, reactiveHandler);
    }
    function readonly(target) {
        return createReactObj(target, true, readonlyHandler);
    }
    //哈希表，避免重复代理
    const reactiveMap = new WeakMap();
    const readonlyMap = new WeakMap();
    function createReactObj(target, isReadobly, baseHandler) {
        if (!isObject(target)) {
            return target;
        }
        else {
            //优化，避免重复优化
            const proxyMap = isReadobly ? readonlyMap : reactiveMap;
            if (proxyMap.has(target)) {
                return proxyMap.get(target);
            }
            else {
                const proxy = new Proxy(target, baseHandler);
                proxyMap.set(target, proxy);
                return proxy;
            }
        }
    }

    exports.reactive = reactive;
    exports.readonly = readonly;

    return exports;

})({});
//# sourceMappingURL=vue.global.js.map
