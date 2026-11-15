import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const USER_KEY = 'techshare_user_name';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedName = sessionStorage.getItem(USER_KEY);
    return savedName ? { name: savedName } : null;
  });

  function login(name) {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    sessionStorage.setItem(USER_KEY, trimmedName);
    setUser({ name: trimmedName });
  }

  function logout() {
    sessionStorage.removeItem(USER_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('useAuthはAuthProviderの内側で使ってください。');
  }

  return context;
}