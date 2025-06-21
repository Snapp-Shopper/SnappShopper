import { Toaster } from "react-hot-toast";
import "../src/assets/style.css";
import { AppRouter } from "./routing/AppRouter";
import { BrowserRouter } from "react-router-dom";
// import Spinner from "./components/shared/Spinner";
import { LoadingProvider } from "./context/LoadingContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <LoadingProvider>
        <CartProvider>
          <AuthProvider>
            <BrowserRouter>
              {/* <Spinner /> */}
              <AppRouter />
              <Toaster />
            </BrowserRouter>
          </AuthProvider>
        </CartProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
