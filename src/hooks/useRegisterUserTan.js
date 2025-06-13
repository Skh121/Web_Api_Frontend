import { useMutation } from "@tanstack/react-query"
import {registerUserService} from "../services/authService"
import {toast} from "react-toastify"

const useRegisterUserTan=()=>{
    return useMutation(
        {
            mutationFn:registerUserService,
            mutationKey:['register'],
            onSuccess:(data)=>{
                toast.success(data.message || "Registration Successfull")
            },
            onError:(err)=>{
                toast.error(err.message || "Registration Failed")
            }
        }
    )
}

export default useRegisterUserTan;
