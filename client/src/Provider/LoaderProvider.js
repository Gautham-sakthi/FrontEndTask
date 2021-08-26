import React, { createContext, useState } from "react";

export const LoaderContext = createContext();
function LoaderProvider({ children }) {
    const [loader, setLoader] = useState(false);

    return (
        <LoaderContext.Provider
            value={{
                loader,
                setLoader,
            }}
        >
            {children}
        </LoaderContext.Provider>
    );
}
export default LoaderProvider;