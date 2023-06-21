import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes";
import { Provider } from "react-redux";
import store from "./stores";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst",
      refetchOnWindowFocus: false,
      //staleTime: 3 * 1000 * 60,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MyRoutes />
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
