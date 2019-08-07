/**
 * new操作符
 * 返回一个对象
 * 1.创建空对象
 * 2.给空对象设置原型为构造函数的原型
 * 3.将构造函数this绑定到空对象上 并执行构造函数
 * 4.返回1创建的对象
 */

function myNew(fn, ...args) {
    let obj = {};
    Object.setPrototypeOf(obj, fn.prototype); //将obj的原型设为传入对象的原型
    let result = fn.apply(obj, args); //将Con的this 绑定至obj上 传入参数并执行
    return result instanceof Object ? result : obj; //返回如果result是对象返回 否则返回obj
}

/**
 * 测试
 */
function FN(name) {
    this.name = name;
}
f1 = new FN("quxiang");
console.log(f1); //{name:'quxaing'}

function NEW(name) {
    this.name = name;
}
let n1 = myNew(NEW, "张三");
console.log(n1); // {name:'张三'}
