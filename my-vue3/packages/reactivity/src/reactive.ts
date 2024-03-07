import {isObject} from "@hzb/shared";
import {reactiveHandler,shallowReactiveHandler,readonlyHandler,shallowReadonlyHandler} from './baseHandler'

export function reactive(target) {
    return createReactObj(target, false, reactiveHandler);
}

export function shallowReactive(target) {
    return createReactObj(target, false, shallowReactiveHandler);
}

export function readonly(target) {
    return createReactObj(target, true, readonlyHandler);
}

export function shallowReadonly(target) {
    return createReactObj(target, true, shallowReadonlyHandler);
}

//哈希表，避免重复代理
const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();

function createReactObj(target, isReadobly, baseHandler) {
    if (!isObject(target)) {
        return target
    } else {
        //优化，避免重复优化
        const proxyMap = isReadobly ? readonlyMap : reactiveMap;
        if (proxyMap.has(target)) {
            return proxyMap.get(target);
        } else {
            const proxy = new Proxy(target, baseHandler)
            proxyMap.set(target, proxy);
            return proxy
        }
    }
}
