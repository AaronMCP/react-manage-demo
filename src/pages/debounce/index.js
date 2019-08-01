import React from 'react';
import { debounce, throttle } from '../../common/debounce';

export class Debounce extends React.Component {
  componentDidMount() {
    // 防抖测试
    // window.addEventListener("scroll", debounce(() => this.deFun(1,3,4), 1000));

    // 节流测试
    window.addEventListener("scroll", throttle(() => this.deFun(2,3,4), 1000));
  }

  deFun(...args) {
    console.log(args);
  }

  render() {
    return <div className="debounce-test">debounce</div>;
  }
}