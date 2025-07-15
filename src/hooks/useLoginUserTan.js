import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import {loginUserService} from "../services/authService"
import { useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"
import { useNavigate } from "react-router-dom"

const useLoginUserTan =()=>{
    const {login,role}= useContext(AuthContext)
    const navigate = useNavigate();
    return useMutation(
        {
            mutationFn:loginUserService,
            mutationKey:['Login'],
            onSuccess:(data)=>{
                toast.success(data.message || "Login Successfull")
                login({email:data.data.email,fullName:data.data.fullName,role:data.data.role,_id:data.data._id},data.token)
                if(data.data.role === "member" || data.data.role=== "admin"){
                    navigate("/dashboard")
                }else{
                    navigate("/login")
                }
            },
            onError:(err)=>{
                toast.error(err.message || "Login Failed")
            }
        }
    )
}

export default useLoginUserTan;