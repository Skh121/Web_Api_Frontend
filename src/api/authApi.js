import instance from "./api";

export const registerUserApi = async(data)=>{
    const response =await instance.post("/auth/register",data);
    return response;
} 
export const loginUserApi = async(data)=>{
    const response = await instance.post("/auth/login",data);
    return response;
}
export const checkoutUserApi = async(data)=>{
    const response = await instance.post("/auth/checkout",data)
    return response;
}
export const requestResetPasswordApi = async(data) =>{
  const response = await instance.post("/auth/request-reset", data)
  return response;
}

export const resetPasswordApi = async(data, token) =>{
    const response = await instance.post("/auth/reset-password/" + token, data)
    return response;
}
