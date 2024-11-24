import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useAppKitAccount } from "@reown/appkit/react";

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { address } = useAppKitAccount();

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-4 flex items-center bg-black/40 backdrop-blur-md z-50 ">
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 text-center pointer-events-none">
          <h1 className="text-white font-bold text-xl">ALINEO</h1>
          <p className="text-white text-sm">FREE INTERACTIVE TAROT</p>
        </div>

        <div className="ml-auto flex items-center pr-32">
          {!address ? <w3m-connect-button /> : <w3m-account-button />}
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
