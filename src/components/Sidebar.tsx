import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}
      <motion.div
        className="fixed top-0 left-0 w-1/4 h-full bg-black text-white shadow-lg z-50"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">CARD SHOP</h1>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
      </motion.div>
    </>
  );
};

export default Sidebar;
