import React from "react";
import Child from './child';

let hot = WrapComponent =>
  class extends WrapComponent {
    constructor(props) {
      super(props);
      this.state = {
        num: 200
      };
    }
    componentDidMount() {
      console.log("iihoc componentDidMount");
      this.clickComponent();
    }

    clickComponent() {
      console.log("Component click2");
    }
    render() {
      return (
        <div>
          <div onClick={this.clickComponent}>iiHoc 点击</div>
          <div>
            <WrapComponent />
          </div>
        </div>
      );
    }
  };
const Us =  hot(Child);
export default Us;
