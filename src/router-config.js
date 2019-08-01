import { Home, About, Us, Debounce } from "./pages";

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
  },
  {
    path: "/Debounce",
    component: Debounce
  }
];
