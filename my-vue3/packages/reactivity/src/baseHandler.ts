import {isObject} from "@hzb/shared";
import {reactive, readonly} from "./reactive";

const get = createGetter();
const shallowReactiveGet = createGetter(true);
const readonlyGet = createGetter(false, true)
const shallowReadonlyGet = createGetter(true, true)

const set=createSetter();
const shallowReactiveSet=createSetter(true);

function createGetter(isShallow = false, isReadonly = true) {
    return function get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver)
        if (isReadonly) {
            // return target
        } else {
            //收集依赖
        }

        if (isShallow) {
            return res
        } else {
            if (isObject(res)) {
                //key对应的value 是对象，要递归,且已经不是浅的
                //性能优化 懒代理
                return isReadonly?readonly(res):reactive(res);
            }

        }
    }
}

function createSetter(isShallow=false){
 return function set(){

 }
}

export const reactiveHandler = {
    get,
    set
};
export const shallowReactiveHandler = {
    get: shallowReactiveGet,
    set:shallowReactiveSet
};
export const readonlyHandler = {
    get: readonlyGet,
    set:(target,key,value)=>{
        console.error("set on key is failed" )
    }
};
export const shallowReadonlyHandler = {
    get: shallowReadonlyGet,
    set:(target,key,value)=>{
        console.error("set on key is failed" )
    }
};
