export function debounce(func, delay) {
    let timer = null;

    return function(...args) {
        if (timer) clearTimeout(timer); //如果有，清除定时器
        timer = setTimeout(() => { //重新计时
            func.apply(this, args)
        }, delay)
    }
}