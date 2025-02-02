import axios from 'axios';


const register=async (email,password,username)=>{

    try{
        const response=await axios.post('/api/login',{username,password,email});
        console.log(response.data);

    }
    catch(error){
        console.error(error);
        throw new Error("Failed to register user");
    }

}