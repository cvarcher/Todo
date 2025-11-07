import axios from "axios";
import { useState } from "react";


//intialValues = {email:'', password:'', username:''} form data
//onSubmit = callback function to be called after successfull submission

export const useAuth = (initialValues, onSubmit) => {
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState(null);
    

//handle input change
 const handleChange =(e)=>{

 }

    
};


