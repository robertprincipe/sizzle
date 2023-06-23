import { createBrowserRouter } from "react-router-dom";
import AuthRoutesList from "./AuthRouter";
import MainRoutesList from "./MainRouter";
import AdminRoutesList from "./AdminRouter";

const router = createBrowserRouter([
  ...MainRoutesList(),
  ...AuthRoutesList(),
  ...AdminRoutesList(),
]);

export default router;
