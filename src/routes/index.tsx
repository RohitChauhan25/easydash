import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import ROUTES from "../constants/routes";
import AdminLayout from "../layout/AdminLayout";
import PrivateRoute from "./private";
import { Suspense } from "react";
import Loader from "../components/Loader";

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ReactRoutes>
          {ROUTES?.map((route, index) => {
            const { component, path } = route;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <AdminLayout>
                    <PrivateRoute component={component} />
                  </AdminLayout>
                }
              />
            );
          })}
        </ReactRoutes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
