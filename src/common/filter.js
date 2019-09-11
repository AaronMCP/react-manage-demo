/**
 * 过滤 script 字符
 *
 * @param {string} s 目标字符串
 * @return {string} 过滤后的字符串
 */
const scriptReg = /<?script.*?>.*?<\/script>/gi;
export function StripScript(s) {
  return s.replace(scriptReg, "");
}

const exp = new RegExp(/(http(s)?:)?\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);
/**
 * 检查输入是否 url
 *
 * @param {string} url url
 * @return {boolean}
 */
export function IsUrl(url) {
  return exp.test(url);
}

/**
 * 检查输入是否为函数
 *
 * @param {function} func
 * @return {boolean}
 */
export function IsFunc(func) {
  return typeof func === "function";
}
/**
 * 判断输入是否对象
 *
 * @param {object}
 */
export function IsObj(obj) {
  return !!obj && typeof obj === "object" && !Array.isArray(obj);
}

/**
 * 判断输入是否为 Email
 *
 * @param {*} val
 * @return {boolean}
 */
const mailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
export function IsEmail(val) {
  return mailReg.test(val);
}

const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
/**
 * 判断输入是否为有效的中国手机号码
 *
 * @param {*} val
 * @return {boolean}
 */
export function IsPhoneNumber(val) {
  const valStr = val.toString();
  return phoneReg.test(valStr);
}

/**
 * 判断输入是否为有效的中国手机号码
 *
 * @param {*} val
 * @return {boolean}
 */
export const IsPhone = IsPhoneNumber;

/**
 * 把输入转化成 boolean
 *
 * @param {*} boolNum
 * @return {boolean}
 */
export function BoolFilter(boolNum) {
  return !!boolNum;
}

/**
 * 检查目标元素是否包含在目标数组中
 *
 * @param {array} arr 需要检查的目标数组
 * @param {any} item 目标元素
 * @return {boolean}
 */
export function InArr(arr, item) {
  if (!arr || !item) return false;
  return arr.indexOf(item) > -1;
}

/**
 * 判断是否有值，如果为 0 则返回 true，其他按照 js 的解析逻辑返回
 *
 * @param {any}
 */
export function HasValue(val) {
  if (val === 0) return true;
  return !!val;
}

  /**
   * @param a 对象
   * @param b 对象
   * @returns boolean 两个对象是否相等
   * @memberof Home
   */
  isObjectEqual = (a, b) => {
    if (
      Object.prototype.toString.call(a) !== "[object Object]" ||
      Object.prototype.toString.call(b) !== "[object Object]"
    ) {
      return a === b;
    }
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);
    if (aProps.length !== bProps.length) {
      return false;
    }
    for (let i = 0; i < aProps.length; i++) {
      const propA = a[aProps[i]];
      const propB = b[aProps[i]];
      if (propA !== propB) {
        if (Object.prototype.toString.call(propA) === "[object Object]") {
          return this.isObjectEqual(propA, propB);
        } else {
          return false;
        }
      }
    }
    return true;
  };
