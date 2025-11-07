import React from 'react'
import { useContext,createContext ,useState,useEffect} from 'react';


export const AuthContext = React.createContext();
export const AuthProvider = ({children}) => {
const [user,setUser]= useState (null);
const [isLoading,setisLoading]= useState (true);
const [isAuthenticated,setIsAuthenticated]= useState (false);
const [accessToken,setAccessToken]= useState (null);
const [refreshToken,setRefreshToken]= useState (null);


//on reload check saved daata from localstorage 
useEffect(() => {
  const storedUser = localStorage.getItem("user");
    const storedAccess = localStorage.getItem("access_token");
    const storedRefresh = localStorage.getItem("refresh_token");


    if (storedUser && storedAccess) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedAccess);
      setRefreshToken(storedRefresh);
      setIsAuthenticated(true);
    }
  setisLoading(false);
}, []);


const login=({email, access_token, refresh_token})=>{
setUser({email});
setAccessToken(access_token);
setRefreshToken(refresh_token);
setIsAuthenticated(true);
setisLoading(false);

localStorage.setItem("user", JSON.stringify({email}));
localStorage.setItem('access_token', access_token);
localStorage.setItem('refresh_token', refresh_token);
}

const logout=()=>{
setUser (null);
setAccessToken (null);
setRefreshToken (null);
setIsAuthenticated (false);
 localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

  return (
<AuthContext.Provider value={
{user,isAuthenticated,accessToken,refreshToken, isLoading,login, logout
}}> 
    {children}
</AuthContext.Provider>  )
}


//custom hook to use auth context
export const useAuthContext = () => useContext(AuthContext);
