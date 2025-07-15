import type { ReactNode } from "react";

import Sidebar from "./Sidebar";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex overflow-hidden">
      <div className="w-[200px]">
        <Sidebar />
      </div>
      <div className="flex-1 p-4 h-screen overflow-y-auto">{children}</div>
    </div>
  );
}

export default Layout;
