import axios from "axios";
import { useState } from "react";


//intialValues = {email:'', password:'', username:''} form data
//onSubmit = callback function to be called after successfull submission

export const useAuth = (initialValues, onSubmit) => {
    const [values, setValues] = useState(initialValues);
    

//handle input change
 const handleChange =(e)=>{
    const {name,value}= e.target
    setValues((prev)=>(
        {...prev,[name]:value}
    ))

 }
 const  handleSubmit =(e)=>{
    e.preventDefault();
    onSubmit(values)
 }
    return {
        values,
        handleChange,
        handleSubmit,
    }
};


