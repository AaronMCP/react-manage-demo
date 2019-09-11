import React from "react";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.startY = 0;
    this.endY = 0;
    this.lastRotate = 0;
    this.moveFlag = false;
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
    this.div.addEventListener('mousedown', e => {
      this.startY = e.clientY;
      this.moveFlag = true;
    });
    document.addEventListener('mousemove', e => {
      if (this.moveFlag) {
        this.endY = this.startY - e.clientY + this.lastRotate;
        this.div.style.transform = `rotate(${this.endY}deg)`;
      }
    });
    document.addEventListener('mouseup', () => {
      this.moveFlag = false;
      this.lastRotate = this.endY;
    });
  }

  add(a) {
    function sum(b) {
      // 使用闭包
      a = a + b; // 累加
      return sum;
    }
    sum.toString = function () {
      // 重写toString()方法
      return a;
    };
    return sum; // 返回一个函数
  }

  render() {
    return (
      <div className="about">
        <div style={{ width: 200, height: 200, background: '#ccc', marginTop: 100, marginLeft:100 }}
          ref={div=>this.div=div}>
          rotate
        </div>
      </div>
    );
  }
}
