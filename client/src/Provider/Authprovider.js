import React, { useState, useEffect, useMemo } from "react";
export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [initial, setInitial] = useState(true);
  const tokenFromLocalStorage = localStorage.getItem("token");
  useEffect(() => {
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
      setInitial(false);
    }
  }, [tokenFromLocalStorage, setToken]);

  const value = useMemo(
    () => ({
      token,
      setToken,
      initial,
      setInitial,
    }),
    [token, setToken, initial, setInitial]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthProvider;
