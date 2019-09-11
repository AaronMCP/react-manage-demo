import React from "react";
import { throttle } from "../../common/debounce";

export default class Debounce extends React.Component {
  componentDidMount() {
    // 防抖测试
    // window.addEventListener("scroll", debounce(() => this.deFun(1,3,4), 1000));

    // 节流测试
    window.addEventListener(
      "scroll",
      throttle(() => this.deFun(2, 3, 4), 1000)
    );
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        window.FastClick.attach(document.body);
      }, false);
    }
  }

  deFun(...args) {
    console.log(args);
  }
  render() {
    return (
      <div className="debounce-test">
        <div style={{width: '100px', height: '100px', background: 'red', marginTop: '500px'}}
          onTouchStart={() => console.log(new Date().getTime())}
          onTouchEnd={() => console.log(new Date().getTime())}
          onClick={() => console.log(new Date().getTime())}>
          111
        </div>
      </div>
    );
  }
}
