/**
 * 防抖函数
 * @param { 传入的待防抖函数 } fn
 * @param {间隔时间} wait
 * @param {是否立即执行一次} immediate
 * 触发事件后 时间间隔内没有再次触发则执行 否则再次等待时间间隔 一直触发则一直等待 知道时间间隔过去之后才执行
 * 关键词 等待 settimeout
 */

function debounce(fn, wait = 50) {
    let timer; //初始值undefined
    return function() {
        if (timer) clearTimeout(timer); //如果有正在计时的计时器 则说明在时间间隔内再次触发  清除计时器 执行下面的代码重进计时
        // 如果没有再次触发 计时完成后将执行函数
        timer = setTimeout(() => {
            fn.apply(this, arguments); //执行函数
        }, wait);
    };
}

function fn() {
    console.log("防抖1");
}

window.addEventListener("click", debounce(fn, 1000));
