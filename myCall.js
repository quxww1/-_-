/*
    实现call方法
*/
Function.prototype.myCall = function(context, ...arr) {
    //判断是否传入了上下文对象
    if (context == null || context == undefined) {
        context = window; //没传入时将上下文置位window
    } else {
        context = Object(context); //如果传入的context是基本类型例如数字 把传入的值包装成一个对象 这样才能使用隐形绑定 context.xx = this 方法来绑定this
    }
    const FN = Symbol("FN"); // 设置临时函数 用symbol是为了避免影响上下文其他属性
    context[FN] = this; //将调用我的函数设置为上下文的一个属性FN
    let result = context[FN](...arr); //执行FN并传入参数
    delete context[FN]; //删除临时属性
    return result; //返回执行结果
};
/*
    测试
*/
let obj = {
    age: 12,
    name: "qux"
};

let fn = function(arg) {
    console.log(this.age);
    console.log(this.name);
    console.log(arg);
};
fn(1); // undefined undefined 1
fn.myCall(obj,1); // 12 qux 1
