// import { Home, About, Us, Debounce, Rxjs } from "./pages";
import React from "react";
import Loadable from "react-loadable";

const Loading = () => {
  return <div>loading</div>;
};

const Home = Loadable({
  loader: () => import("./pages/home"),
  loading: Loading
});

const About = Loadable({
  loader: () => import("./pages/about"),
  loading: Loading
});

const Us = Loadable({
  loader: () => import("./pages/us"),
  loading: Loading
});

const Debounce = Loadable({
  loader: () => import("./pages/debounce"),
  loading: Loading
});

const Rxjs = Loadable({
  loader: () => import("./pages/rxjs"),
  loading: Loading
});

const VList = Loadable({
  loader: () => import("./pages/list"),
  loading: Loading
});

const Hooks = Loadable({
  loader: () => import("./pages/hooks"),
  loading: Loading
});

export const routerConfig = [
  {
    path: "/Home",
    component: Home
  },
  {
    path: "/About",
    component: About
  },
  {
    path: "/Us",
    component: Us
  },
  {
    path: "/Debounce",
    component: Debounce
  },
  {
    path: "/Rxjs",
    component: Rxjs
  },
  {
    path: "/Vlist",
    component: VList
  },
  {
    path: "/Hooks",
    component: Hooks
  }
];
