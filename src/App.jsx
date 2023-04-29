import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes";
import { Provider } from "react-redux";
import store from "./stores";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <MyRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
