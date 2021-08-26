import React, { useState, useEffect, useMemo } from "react";
export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const tokenFromLocalStorage = localStorage.getItem("token");
  useEffect(() => {
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, [tokenFromLocalStorage, setToken]);

  const value = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token, setToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthProvider;
