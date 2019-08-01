/**
 * 防抖函数
 * 任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行
 * @export
 * @param {*} callback 回调函数
 * @param {*} delay 时间间隔
 */
export function debounce(callback, delay) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(callback, delay);
  };
}

/**
 * 节流函数
 * 指定时间间隔内只会执行一次任务
 * @param {*} callback 回调函数
 * @param {*} delay 指定时间间隔
 * @returns
 */
export function throttle(callback, delay) {
  let canRun = true;
  return function() {
    if(!canRun) return;
    canRun = false;
    setTimeout(() => {
      callback();
      canRun = true;
    }, delay);
  };
}