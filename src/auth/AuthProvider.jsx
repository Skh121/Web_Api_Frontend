import React from "react";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const AuthContextProvider = ({children})=>{
    const [user,setUser]= useState(null);
    const [loading,setLoading]= useState(true);

    const login=(userData,token)=>{
        setLoading(true);
        localStorage.setItem("user",JSON.stringify(userData));
        localStorage.setItem("token",token)
        setUser(userData)
        setLoading(false)
    }

    const logout =()=>{
        setLoading(true)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null);
        setLoading(false)
    }

    useEffect(()=>{
        setLoading(true)
        const storedUser= localStorage.getItem("user")
        const token = localStorage.getItem("token")
        if(storedUser && token){
            setUser(JSON.parse(storedUser));
        }else{
            logout();
        }
        setLoading(false)
    },[]);
    const role = user?.role;
    return (
        <AuthContext.Provider value={{user,loading,login,logout,role,isAuthenticated:user!==null}}>
            {children}
        </AuthContext.Provider>
    )

} 

export default AuthContextProvider
