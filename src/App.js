import { useState, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import NewContainer from "./Components/NewContainer";
import AppRefactored from "./Components/AppRefactored";
import NewContainerRefactored from "./Components/NewContainerRefactored";


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRefactored />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;


