import React from "react";
// import { Prompt } from 'react-router';

export class Home extends React.Component {
  state = {
    startPageX: 0,
    draggable: false,
    sliderWidth: 200
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const a = {
      id: 1,
      name: "a",
      props: {
        a: 1
      }
    };
    const b = {
      id: 2,
      name: "a",
      props: {
        a: 1
      }
    };
    this.isObjectEqual(a, b);
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

  dragStart = e => {
    e.persist();
    this.setState({
      startPageX: e.pageX,
      draggable: true
    });
  };

  dragEnd = () => {
    this.setState({
      draggable: false
    });
  };

  dragging = e => {
    e.persist();
    this.setState(prevState => {
      if (prevState.draggable) {
        let sliderWidth = prevState.sliderWidth + e.pageX - prevState.startPageX;
        if (sliderWidth < 20 || sliderWidth > 300) return;
        return { sliderWidth, startPageX: e.pageX };
      }
    });
  };

  render() {
    const { sliderWidth } = this.state;
    const pxWidth = `${sliderWidth}px`;
    return (
      <div className="home">
        {/* <Prompt when message="Are you sure?" /> */}
        <div
          className="left"
          onMouseDown={e => this.dragStart(e)}
          onMouseMove={e => this.dragging(e)}
          onMouseUp={this.dragEnd}
          onMouseLeave={this.dragEnd}
          style={{ width: pxWidth }}>
          left-side
        </div>
        <div className="right" style={{ left: pxWidth }}>
          <div className="right-header">header</div>
          <div className="right-center">center</div>
          <div className="right-bottom">bottom</div>
        </div>
      </div>
    );
  }
}
