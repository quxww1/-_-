/*
    实现apply方法
    apply接受第二个参数为类数组对象
*/
Function.prototype.myApply = function(context) {
    //判断是否传入了上下文对象
    if (context == null || context == undefined) {
        context = window; //没传入时将上下文置位window
    } else {
        context = Object(context); //如果传入的context是基本类型例如数字 把传入的值包装成一个对象 这样才能使用隐形绑定 context.xx = this 方法来绑定this
    }
    // 判断是否为类数组对象
    function isArrayLike(o) {
        if (
            o && // o不是null、undefined等
            typeof o === "object" && // o是对象
            isFinite(o.length) && // o.length是有限数值
            o.length >= 0 && // o.length为非负值
            o.length === Math.floor(o.length) && // o.length是整数
            o.length < 4294967296 // o.length < 2^32
        )
            return true;
        else return false;
    }
    const FN = Symbol("FN");
    context[FN] = this;
    let args = arguments[1];
    let result;
    // 判断传入的参数是否为类数组
    if (args) {
        // 类型不符合抛出错误
        if (!Array.isArray(args) && !isArrayLike(args)) {
            throw new TypeError(
                "myApply 第二个参数不为数组并且不为类数组对象抛出错误"
            );
        } else {
            // 类型符合
            args = Array.from(args); // 转为数组
            result = context[FN](args); // 执行函数并展开数组，传递函数参数
        }
    } else {
        result = context[FN](); // 没有传第二个参数的情况 直接执行函数();
    }

    delete context[FN]; //删除临时函数
    return result;
};
/*
    测试
*/
let obj = {
    age: 12,
    name: "qux"
};

let fn = function(arr) {
    console.log(this.age);
    console.log(this.name);
    console.log(...arr);
};
let arr = [1, 2, 3];
fn(arr); // undefined undefined 1 2 3
fn.myApply(obj, arr); // 12 qux 1 2 3
