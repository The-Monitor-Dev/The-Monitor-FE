import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import SideMenu from "@components/SideMenu";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className="flex flex-col font-pretendard">
          <Header />
          <div className="flex h-[calc(100vh-68px)] min-h-[794px] bg-base-bg">
            <SideMenu />
            <Outlet />
          </div>
        </div>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
