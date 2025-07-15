import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import UserList from "@/pages/UserList";
import Analytics from "@/pages/Analytics";
import Products from "@/pages/Products";
import Settings from "@/pages/Settings";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/products" element={<Products />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;
