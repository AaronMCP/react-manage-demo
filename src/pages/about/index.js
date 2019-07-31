import React from "react";

export class About extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const arrI = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [[14], 12, 13]]], 10];
    let arrR = [];
    function reduceArr(arr) {
      arr.map(item => {
        if (item[0]) {
          reduceArr(item);
        } else {
          arrR.push(item);
        }
      });
      arrR.sort((a, b) => a - b);
      return arrR;
    }
    console.log(reduceArr(arrI));
  }

  add(a) {
    function sum(b) {
      // 使用闭包
      a = a + b; // 累加
      return sum;
    }
    sum.toString = function() {
      // 重写toString()方法
      return a;
    };
    return sum; // 返回一个函数
  }

  render() {
    return <div className="about">About </div>;
  }
}
