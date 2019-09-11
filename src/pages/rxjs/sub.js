import React from 'react';
import { Route, Switch, NavLink, Redirect } from "react-router-dom";

const sub3 = () => {
  return <div>333</div>;
};

const sub4 = () => {
  return <div>444</div>;
};
const sub5 = () => {
  return <div>5555</div>;
};

export class Sub1 extends React.Component {
  render() {
    const{match}=this.props;
    return (
      <div>
        <NavLink to={match.path + '/sub3'}>sub3</NavLink>
        <NavLink to={match.path + '/sub4'}>sub4</NavLink>
        <NavLink to={match.path + '/sub5'}>sub5</NavLink>
        <Switch>
          <Route exact path={match.path} render={() => <Redirect to={match.path + '/sub3'} />} />
          <Route exact path={match.path + '/sub3'} component={sub3}/>
          <Route exact path={match.path + '/sub4'} component={sub4}/>
          <Route exact path={match.path + '/sub5'} component={sub5}/>
        </Switch>
      </div>
    );
  }
}

export class Sub2 extends React.Component {
  render() {
    return (
      <div>2222</div>
    );
  }
}