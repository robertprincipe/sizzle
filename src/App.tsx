import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { HelmetProvider } from "react-helmet-async";
import router from "./components/router";
import { ThemeProvider } from "./hooks/useTheme";
import { isAxiosError } from "axios";
import ToasterConfig from "./components/shared/ToasterConfig";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      onError: (error) => {
        if (isAxiosError(error)) {
          console.log(error.response?.data);
        }
      },
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
          <ToasterConfig />
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
