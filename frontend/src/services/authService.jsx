import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const register=async ({email,password,username})=>{

    try{
         console.log("Signup function called" ,"in Authserviceapi")
        const response=await axios.post(`${API_BASE_URL}/register`,{username,password,email});
        return response.data; 
        

    }
    catch(error){
        
        if (error.response) {
            throw new Error(error.response.data.message || "Failed to register. Please try again.");
        } else {
            throw new Error("Network error. Please check your connection.");
        }
    }

}
// console.error(error,"eeee mara jayega");
export const login=async (email,password) => {
    try{
        console.log("Signup function called" ,"in Authserviceapi")

        const response=await axios.post(`${API_BASE_URL}/login`,{email,password});
        return response.data;  // Return the response data
        // console.log(response.data);

    }
    catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Failed to login. Please try again.");
        } else {
            throw new Error("Network error. Please check your connection.");
        }
    }

}