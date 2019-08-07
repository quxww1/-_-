/**
 * bind函数
 * bind只绑定this 不会执行
 * 返回一个绑定了this之后的函数
 */
Function.prototype.myBind = function(objThis, ...params) {
    const thisFn = this; // 存储源函数
    // 对返回的函数 secondParams 二次传参
    let fToBind = function(...secondParams) {
        // this是否是fToBind的实例 也就是返回的fToBind是否通过new调用
        const context = this instanceof fToBind ? this : Object(objThis); // new调用就绑定到this上,否则就绑定到传入的objThis上
        return thisFn.call(context, ...params, ...secondParams); // 用call调用源函数绑定this的指向并传递参数,返回执行结果
    };
    fToBind.prototype = Object.create(thisFn.prototype); // 复制源函数的prototype给fToBind
    return fToBind; // 返回拷贝的函数
};

let obj = {
    age: 22,
    name: "qux"
};
function fn(...a) {
    console.log(this.age);
    console.log(this.name);
    console.log(...a);
}
let newFn = fn.myBind(obj, 3, 4);
fn(1); //undefined x2 1
newFn(1); //22 qux 3 4 1
