import { ThemeProvider } from "next-themes";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { Toaster as ToasterRX } from "./components/ui/toaster";
import { HelmetProvider } from "react-helmet-async";
import router from "./components/router";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RouterProvider router={router} />
          <ToasterRX />
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },

              // Default options for specific types
              success: {
                duration: 3000,
              },
            }}
          />
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
