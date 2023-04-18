import { ThemeProvider } from "next-themes";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { Toaster } from "./components/ui/toaster";
import { HelmetProvider } from "react-helmet-async";
import router from "./components/router";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
