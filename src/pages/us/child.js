import React from 'react';

export default class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 2019
    };
  }
  componentDidMount() {
    console.log("child component Did Mount");
  }
  clickComponent() {
    console.log("Component click");
  }
  render() {
    return (
      <div>{this.state.num}</div>
    );
  }
}