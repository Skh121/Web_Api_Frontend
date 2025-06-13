import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import {loginUserService} from "../services/authService"
import { useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"

const useLoginUserTan =()=>{
    const {login}= useContext(AuthContext)
    return useMutation(
        {
            mutationFn:loginUserService,
            mutationKey:['Login'],
            onSuccess:(data)=>{
                console.log(data)
                toast.success(data.message || "Login Successfull")
                login({email:data.data.email,fullName:data.data.fullName,role:data.data.role},data.token)
            },
            onError:(err)=>{
                toast.error(err.message || "Login Failed")
            }
        }
    )
}

export default useLoginUserTan;