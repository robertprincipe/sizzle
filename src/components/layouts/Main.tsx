import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { SiteHeader } from "../site-header";
import Footer from "../shared/footer";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";

const Main = () => {
  const { me, check_authenticated, refresh_access } = useAuthStore(
    (state) => state
  );
  const router = useNavigation();
  useEffect(() => {
    refresh_access();
    check_authenticated();
    me();
  }, [router]);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Main;
