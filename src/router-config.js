import { Home, About, Us } from "./pages";

export const routerConfig = [
  {
    path: "/Home",
    component: Home,
    exact: true
  },
  {
    path: "/About",
    component: About
  },
  {
    path: "/Us",
    component: Us
  }
];
