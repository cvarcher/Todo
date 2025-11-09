import React from "react";
import AuthForm from "../../components/AuthForm";
import tt3 from "../../assets/tt3.png"
const Login = () => {
    return (
        <>
            <div className="flex">
                {/* //login form */}
                <div className="bg-[#eae4de]">
                    <AuthForm label="Login" />
                </div>
                {/* image */}
                <div className="w-full flex justify-center align-center bg-[#dee4fa]">
                    <img src={tt3} alt="" className="max-w-[900px] h-vh cover" />
                </div>
            </div>
        </>
    );
};

export default Login;
