/**
 * 节流函数throttle
 * @param { 待节流函数 } fn
 * @param { 时间间隔 } wait
 * 规定时间间隔内只能执行一次 不等待
 * 当前时间减去初始时间大于时间间隔就执行 不大于就不执行
 */

function throttle(fn, wait) {
    let prev = new Date();
    return function() {
        const args = arguments;
        const now = new Date();
        //每次执行的时候对比 当前时间戳减去prev 大于时间间隔才执行
        if (now - prev > wait) {
            fn.apply(this, args);
            prev = new Date(); //执行完后更新时间节点
        }
    };
}

let fn = function() {
    console.log("节流1");
};
window.addEventListener("click", throttle(fn, 1000));
