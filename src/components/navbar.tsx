import { LogIn, LogInIcon, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, login, logout, principal } = useAuth();

  return (
    <nav className=" text-white p-2 shadow-md">
      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
          <p className="text-sm">
            Bienvenido, {"   "}
            <span className="font-bold">
              {principal.toText().substring(0, 6)}...{" "}
            </span>
          </p>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={login}
          className="p-2 hover:bg-blue-700 text-sm text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Sign in
        </button>
      )}
    </nav>
  );
}
