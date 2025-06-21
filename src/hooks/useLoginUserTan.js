import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import {loginUserService} from "../services/authService"
import { useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"
import { useNavigate } from "react-router-dom"

const useLoginUserTan =()=>{
    const {login}= useContext(AuthContext)
    const navigate = useNavigate();
    return useMutation(
        {
            mutationFn:loginUserService,
            mutationKey:['Login'],
            onSuccess:(data)=>{
                toast.success(data.message || "Login Successfull")
                login({email:data.data.email,fullName:data.data.fullName,role:data.data.role},data.token)
                if(data.data.role === "member" || "admin"){
                    navigate("/dashboard")
                }
            },
            onError:(err)=>{
                toast.error(err.message || "Login Failed")
            }
        }
    )
}

export default useLoginUserTan;