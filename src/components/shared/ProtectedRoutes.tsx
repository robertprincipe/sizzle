import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  redirectTo?: string;
}

export const ProtectedRoute = ({ redirectTo = "/auth/login" }: Props) => {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  if (!isAuth) return <Navigate to={redirectTo} />;
  return <Outlet />;
};

export const UserLogged = () => {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  if (isAuth) return <Navigate to={"/"} />;
  return <Outlet />;
};
