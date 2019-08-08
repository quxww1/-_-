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

function myNew2() {
    var obj = new Object(),
	// 获得构造函数，arguments中去除第一个参数 Con就是原函数
    Con = [].shift.call(arguments);
	// 链接到原型，obj 可以访问到构造函数原型中的属性
    obj.__proto__ = Con.prototype; //绑定原型
	// 绑定 this 实现继承，obj 可以访问到构造函数中的属性
    var ret = Con.apply(obj, arguments);
	// 优先返回构造函数返回的对象
	return ret instanceof Object ? ret : obj;
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
