import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

//api for login
export const login = async(loginData)=>{
    try {
         const res =await axios.post(`${API_URL}login`,loginData,{
            headers:{
                Authorization:`Bearer ${access_token}`
            }
         })

         console.log(res.data)
         return res.data
    } catch (error) {
        console.log("Error while calling login API ", error);
    }
}


//api for signup
export const signUp = async()=>{
try {
     const res =await axios.post(`${API_URL}register`,{email:'ss@gmail.com', username :'ss', password :"salma123"})
     console.log(res.data)
     return res.data
} catch (error) {
    console.log("Error while calling signup API ", error);
}

}