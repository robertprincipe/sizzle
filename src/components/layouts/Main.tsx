import { Outlet } from "react-router-dom";
import { SiteHeader } from "../site-header";
import Footer from "../shared/footer";

const Main = () => {
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
