import React from "react";
import { Subject, from } from "rxjs";
// import { Picker, List } from "antd-mobile";
import Picker from 'antd/es/popconfirm';
import List from 'antd/es/list';
import 'antd/es/popconfirm/style';
import 'antd/es/list/style';

import _ from "loadsh";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classN: "hidden"
    };
  }

  componentDidMount() {
    // const source = from([1,2,3]);
    // console.log(source);
    // const subject = new Subject();
    // const multicasted = source.multicast(subject);

    // // 相当于subject.subscribe();
    // multicasted.subscribe({
    //   next: v => console.log('A' + v)
    // });
    // multicasted.subscribe({
    //   next: v => console.log('B' + v)
    // });

    // // 相当于source.subscribe(subject)
    // multicasted.connect();
    let a = {
      id: "1",
      name: 1.2,
      as: 0
    };
    this.objectValueToString(a);
    console.log(this.objectValueToString(a));
    console.log(a);
  }

  objectValueToString = object => {
    const newObj = {};
    Object.keys(object).map(val => {
      if (_.isNumber(object[val])) {
        newObj[val] = object[val].toString();
      }
    });
    return _.assign({}, object, newObj);
  };

  click() {
    const { classN } = this.state;
    this.setState({
      classN: classN == "hidden" ? "show" : "hidden"
    });
  }

  render() {
    const colors = [
      {
        label: (
          <div>
            <span style={{ backgroundColor: "#FF0000" }} />
            <span>红色</span>
          </div>
        ),
        value: "#FF0000"
      },
      {
        label: (
          <div>
            <span style={{ backgroundColor: "#00FF00" }} />
            <span>绿色</span>
          </div>
        ),
        value: "#00FF00"
      },
      {
        label: (
          <div>
            <span style={{ backgroundColor: "#0000FF" }} />
            <span>蓝色</span>
          </div>
        ),
        value: "#0000FF"
      }
    ];
    return (
      <div className="home">
        1
        <div
          onClick={() => this.click()}
          onTouchStart={() => console.log(2, +new Date())}>
          asdadsdas
        </div>
        <Picker data={colors} onVisibleChange={vis => console.log(vis)}>
          <List.Item arrow="horizontal">Complex Labels</List.Item>
        </Picker>
        <div className={"animate " + this.state.classN}>12121</div>
      </div>
    );
  }
}
