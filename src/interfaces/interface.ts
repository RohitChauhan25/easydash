import { LazyExoticComponent } from "react";

export interface IRoutes {
  path: string;
  component: LazyExoticComponent<() => JSX.Element>;
  restricted: boolean;
  exact: boolean;
}

export interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}
