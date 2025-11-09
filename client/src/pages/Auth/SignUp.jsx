import React from "react";
import AuthForm from "../../components/AuthForm";
import tt4 from "../../assets/tt4.png";
const SignUp = () => {
    return (
        <>
            <div className="flex ">
                <div>
                    <AuthForm label="Sign Up" />
                </div>
                <div className="w-full flex justify-center align-center bg-[#efedea]">
                    <img src={tt4} alt="" className="max-w-[1800px] h-vh cover" />
                </div>
            </div>
        </>
    );
};

export default SignUp;
