import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./contexts/CartContext";
import { lazy, Suspense } from "react";
import HomePage from "./pages/HomePage";

const CartPage = lazy(() => import("./pages/CartPage"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Suspense fallback={"로딩 중..."}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Suspense>
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
