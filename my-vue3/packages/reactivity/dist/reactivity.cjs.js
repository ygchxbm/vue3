'use strict';

function isObject(target) {
    return typeof target === 'object' && target !== null;
}

const get = createGetter();
const shallowReactiveGet = createGetter(true);
const readonlyGet = createGetter(false, true);
const shallowReadonlyGet = createGetter(true, true);
const set = createSetter();
const shallowReactiveSet = createSetter(true);
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
const shallowReactiveHandler = {
    get: shallowReactiveGet,
    set: shallowReactiveSet
};
const readonlyHandler = {
    get: readonlyGet,
    set: (target, key, value) => {
        console.error("set on key is failed");
    }
};
const shallowReadonlyHandler = {
    get: shallowReadonlyGet,
    set: (target, key, value) => {
        console.error("set on key is failed");
    }
};

function reactive(target) {
    return createReactObj(target, false, reactiveHandler);
}
function shallowReactive(target) {
    return createReactObj(target, false, shallowReactiveHandler);
}
function readonly(target) {
    return createReactObj(target, true, readonlyHandler);
}
function shallowReadonly(target) {
    return createReactObj(target, true, shallowReadonlyHandler);
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
exports.shallowReactive = shallowReactive;
exports.shallowReadonly = shallowReadonly;
//# sourceMappingURL=reactivity.cjs.js.map
