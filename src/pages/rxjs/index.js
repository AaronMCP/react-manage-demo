import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import { Observable } from "rxjs";
import { Sub1, Sub2 } from "./sub";

export default class Rxjs extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const obse = Observable.create(function(obser) {
      obser.next(1);
      obser.next(2);
    });

    obse.subscribe(function(x) {
      console.log(x);
    });

    // const obse2 = Observable.create(function subscribe(obser) {
    //   let i = 1;
    //   setInterval(() => {
    //     obser.next(i++);
    //   }, 1000);
    // });

    // obse2.subscribe(x => console.log(x));
    // obse2.subscribe(x => console.log(++x));
  }

  render() {
    const { match } = this.props;
    return (
      <div className="rxjs">
        <NavLink to={match.path + '/sub1'}>sub1</NavLink>
        <NavLink to={match.path + '/sub2'}>sub2</NavLink>
        <Switch>
          <Route
            path={match.path + '/sub1'}
            key={1}
            render={_props => {
              let { key } = _props.location;
              return <Sub1 {..._props} key={key} />;
            }}/>
          <Route
            path={match.path + '/sub2'}
            key={1}
            render={_props => {
              let { key } = _props.location;
              return <Sub2 {..._props} key={key} />;
            }}/>
        </Switch>
      </div>
    );
  }
}
