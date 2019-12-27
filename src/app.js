import React from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";
import { Redirect } from "react-router";
import { NotFound } from "./pages/components";
import { routerConfig } from "./router-config";
import "./styles/index.scss";

const RouterRender = routerConfig => {
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
          return <route.component {..._props} {...props} key={key} />;
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
            <NavLink to="/Rxjs/sub1/sub3" activeClassName="selected">
              Rxjs
            </NavLink>
            <NavLink to="/VList" activeClassName="selected">
              VList
            </NavLink>
            <NavLink to="/hooks" activeClassName="selected">
              Hooks
            </NavLink>
          </div>
          <div className="container">
            <Switch>
              {/* <RouterRender routerConfig={routerConfig} {...this.props} /> */}
              {RouterRender(routerConfig)}
              <Route exact path="/" render={() => <Redirect to="/Home" />} />
              <Route path="*" render={() => <NotFound />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("App"));
