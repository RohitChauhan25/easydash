import { lazy } from "react";
import { IRoutes } from "../interfaces/interface";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Orders = lazy(() => import("../pages/Orders"));
const Customers = lazy(() => import("../pages/Customers"));
const Websites = lazy(() => import("../pages/Websites"));

export const DashboardRoute = {
  path: "/",
  component: Dashboard,
  restricted: true,
  exact: true,
};

export const CustomersRoute = {
  path: "/customer",
  component: Customers,
  restricted: true,
  exact: true,
};
export const OrdersRoute = {
  path: "/orders",
  component: Orders,
  restricted: true,
  exact: true,
};

export const WebSiteRoute = {
  path: "/website",
  component: Websites,
  restricted: true,
  exact: true,
};

const ROUTES: IRoutes[] = [
  DashboardRoute,
  CustomersRoute,
  OrdersRoute,
  WebSiteRoute,
];

export default ROUTES;
