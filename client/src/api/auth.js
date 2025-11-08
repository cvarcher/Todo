import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

//api for login
export const loginUser = async (loginData) => {
    try {
        const res = await axios.post(`${API_URL}login`, loginData);
        console.log(res.data);
        return res.data; // { email, access_token, refresh_token }
    } catch (error) {
    console.error("Error calling login API:", error.response?.data || error);
    throw error;
    }
};

//api for signup
export const signUp = async (signupData) => {
    try {
        const res = await axios.post(`${API_URL}register`, signupData);
        return res.data;
    } catch (error) {
        console.log("Error while calling signup API ", error);
    }
};
