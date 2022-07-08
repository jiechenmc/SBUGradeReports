import { QueryClient, QueryClientProvider } from "react-query";

import Result from "./components/Result";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Result />
    </QueryClientProvider>
  );
}

export default App;
