import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import SideMenu from "@components/SideMenu";
import routes from "@constants/routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: true,
    },
  },
});

function App() {
  const location = useLocation();

  const paths = [
    routes.monitoring,
    routes.report,
    routes.settingKeyword,
    routes.settingEmail,
  ];
  const isPathInPaths = paths.includes(
    location.pathname as (typeof paths)[number],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className="flex min-w-[1440px] flex-col font-pretendard">
          <Header />
          <div className="flex h-[calc(100vh-68px)] min-h-[794px] bg-base-bg">
            {isPathInPaths && <SideMenu />}
            <div className="flex-grow">
              <Outlet />
            </div>
          </div>
        </div>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
