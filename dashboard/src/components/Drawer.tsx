import React from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number | string;
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  children,
  width = 320,
}) => {
  return (
    <aside
      className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width }}
      role="dialog"
      aria-modal="true">
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        onClick={onClose}
        aria-label="Close Drawer">
        &times;
      </button>
      <div className="p-6 h-full overflow-y-auto">{children}</div>
    </aside>
  );
};

export default Drawer;
