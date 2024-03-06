import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () =>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {
    const [authUser, setauthUser] = useState(
        JSON.parse(localStorage.getItem("loggedInUser")) || null
    )

    return <AuthContext.Provider value={{authUser, setauthUser}}>
        {children}
    </AuthContext.Provider>
}