import { useMutation } from "@tanstack/react-query"
import { checkoutUserService } from "../services/authService"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const useCheckout = ()=>{
    const navigate = useNavigate()
    return useMutation({
        mutationFn:checkoutUserService,
        mutationKey:['checkout'],
        onSuccess:(data)=>{
            toast.success(data.message || "Subscription Successfull")
            if(data?.user?.role ==="member" || "admin"){
            navigate("/dashboard")
            }
        },
        onError:(err)=>{
            toast.error(err.message || "Subscription Failed")
        }
    })
}

export default useCheckout;