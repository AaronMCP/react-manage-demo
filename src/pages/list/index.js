import React from "react";
import { List, AutoSizer } from "react-virtualized";
import { PullToRefresh, Accordion } from "antd-mobile";

export default class VList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresing: false,
      data: Array.from({ length: 100 }, (i, l) => l + 1)
    };
  }

  rowRenderer = ({key, index, style}) => {
    return (
      <div key={key} style={style}>
        {this.state.data[index]}
      </div>
    );
  }

  render() {
    return (
      <div className="v-list">
        <PullToRefresh
          damping={60}
          ref={pull => (this.pull = pull)}
          direction="down"
          indicator={{finish: <span/>, deactivate: <span/>}}
          refreshing={this.state.refresing}
          onRefresh={() => {
            this.setState({
              refreshing: true
            });
            setTimeout(() => {
              this.setState({
                refreshing: false
              });
            }, 1000);
          }}>
          <List
            height={300}
            width={300}
            rowHeight={50}
            rowCount={this.state.data.length}
            rowRenderer={this.rowRenderer}/>
        </PullToRefresh>
      </div>
    );
  }
}
