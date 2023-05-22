import { createBrowserRouter } from "react-router-dom";
import AuthRoutesList from "./AuthRouter";
import MainRoutesList from "./MainRouter";

const router = createBrowserRouter([...AuthRoutesList(), ...MainRoutesList()]);

export default router;
