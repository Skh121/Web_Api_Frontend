import instance from "./Api";

export const registerUserApi = async(data)=>{
    const response =await instance.post("/auth/register",data);
    return response;
} 
export const loginUserApi = async(data)=>{
    const response = await instance.post("/auth/login",data);
    return response;
}
