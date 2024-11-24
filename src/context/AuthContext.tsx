import { createContext, useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";

const AuthContext = createContext<{
  authClient: AuthClient | null;
  identity: any | null;
  principal: any | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}>({
  authClient: null,
  identity: null,
  principal: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [identity, setIdentity] = useState<any | null>(null);
  const [principal, setPrincipal] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function initAuth() {
      const client = await AuthClient.create();
      setAuthClient(client);

      if (await client.isAuthenticated()) {
        handleAuthenticated(client);
      }
    }

    if (typeof window !== "undefined") {
      initAuth();
    }
  }, []);

  const handleAuthenticated = async (client: AuthClient) => {
    const identity = client.getIdentity();
    setIdentity(identity);
    setPrincipal(identity.getPrincipal());
    setIsAuthenticated(true);
  };

  const login = async () => {
    if (!authClient) return;
    authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleAuthenticated(authClient);
      },
    });
  };

  const logout = async () => {
    if (!authClient) return;
    await authClient.logout();
    setIdentity(null);
    setPrincipal(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authClient,
        identity,
        principal,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
