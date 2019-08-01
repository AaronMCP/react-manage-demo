import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Redirect } from "react-router";
import { routerConfig } from "./router-config";
import "./styles/index.scss";

const RouterRender = ({ routerConfig, ...other }) => {
  return routerConfig.map(route => {
    const { path, exact, props } = route;
    const obj = {
      path
    };
    if (exact) obj["exact"] = true;
    return (
      <Route
        key={path}
        {...obj}
        render={_props => {
          let { key } = _props.location;
          return <route.component {..._props} {...props} {...other} key={key} />;
        }}/>
    );
  });
};

class App extends React.Component {
  render() {
    return (
      <div className="main">
        <Router>
          <div className="nav">
            <NavLink to="/Home" activeClassName="selected">
              首页
            </NavLink>
            <NavLink to="/About" activeClassName="selected">
              关于
            </NavLink>
            <NavLink to="/Us" activeClassName="selected">
              我们
            </NavLink>
            <NavLink to="/Debounce" activeClassName="selected">
              防抖和节流
            </NavLink>
          </div>
          <div className="container">
            <RouterRender routerConfig={routerConfig} {...this.props} />
            <Route exact path="/" render={() => <Redirect to="/Home" />} />
          </div>
        </Router>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("App"));
