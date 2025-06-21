import {checkoutUserApi, loginUserApi,registerUserApi} from "../api/authApi"
export const registerUserService= async(formData)=>{
    try{
        const response = await registerUserApi(formData);
        return response.data
    }catch(e){
        throw e.response?.data || {message:"Registration Failed"}
    }
}
export const loginUserService= async(formData)=>{
    try{
        const response = await loginUserApi(formData);
        return response.data
    }catch(e){
        throw e.response?.data || {message:"Login Failed"}
    }
}
export const checkoutUserService = async(formData)=>{
    try{
        const response = await checkoutUserApi(formData);
        return response.data;
    }catch(e){
        throw e.response?.data || {message:"Payment Failed"}
    }
}