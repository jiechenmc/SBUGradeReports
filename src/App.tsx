import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Result from "./components/Result";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Result />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
