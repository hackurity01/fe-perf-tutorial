import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Users from "@/pages/Users";
import Products from "@/pages/Products";
import Settings from "@/pages/Settings";

const Analytics = lazy(() => import("@/pages/Analytics"));

function App() {
  useEffect(() => {
    const loadAnalytics = () => {
      import("@/pages/Analytics");
    };

    if (window.requestIdleCallback) {
      window.requestIdleCallback(loadAnalytics);
    } else {
      setTimeout(loadAnalytics, 1);
    }
  }, []);

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
