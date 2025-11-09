import React from "react";
import "flowbite";
import google from "../assets/google.png";
import { useAuth } from "../hooks/useAuth";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { loginUser, signUp } from "../api/auth";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Form = ({ label }) => {
    const navigate = useNavigate()
    const { login } = useAuthContext();
    const initialValues =
        label.toLowerCase() === "sign up"
            ? { email: "", password: "", username: "" }
            : { email: "", password: "" };

    //tanstack mutuation
    const queryClient = useQueryClient();
    const loginMutation = useMutation(
        { mutationFn:loginUser,
        onSuccess: (data) => {
            login(data); // set user data in context
            console.log("user logged in : ", data);
            navigate('/todo')
        },
    });

    //singup mutation
    const signupMutation = useMutation( {
        mutationFn:signUp,
        onSuccess: (data) => {
            console.log("signed in:", data);
            navigate('/auth/login')
        },
    });

    const onSubmit = async (formData) => {
        try {
            if (label.toLowerCase() === "sign up") {
                await signupMutation.mutateAsync(formData);
            } else {
                await loginMutation.mutateAsync(formData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const { values, handleChange, handleSubmit } = useAuth(
        initialValues,
        onSubmit,
    );

    return (
        <div className="bg-[#fcfaf8] min-h-screen flex flex-col ">
            <h1 className="text-4xl font-bold mt-20 ml-10 md:text-left flex items-center">
                <span className="text-[#0b4074] mr-1">DO.</span> DO
            </h1>

            <h1 className="text-4xl font-bold mt-20 ml-10 md:text-left flex items-center">
                {label.toLowerCase() == "sign up" ? (
                    <p className="text-2xl">Welcome Back!</p>
                ) : (
                    <p className="text-2xl">Welcome!</p>
                )}
            </h1>
            <div className=" flex flex-1">
                <form
                    className="flex flex-col justify-center w-1/2 md:w-[600px] p-10 align-center lg:full lg:align-center"
                    onSubmit={handleSubmit}
                >
                    {/* <h2>{label}</h2> */}
                    {label.toLowerCase() === "sign up" && (
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-md text-gray-600  "
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
              className="focus:outline-none border border-gray-300 text-gray-900 text-lg p-3 rounded-lg  block w-full"
                                placeholder="Enter your Username"
                                required
                            />
                        </div>
                    )}

                    <div className="mb-6">
                        <label htmlFor="email"
                            className="block mb-2 text-md text-gray-600 "
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
              className="border border-gray-300 text-gray-700 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter you Email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-md text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
              className="border border-gray-300 text-gray-700 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="flex items-start mb-6">
                        <button className="w-full border border-gray-300 rounded-md py-2 text-gray-700 text-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-100">
                            <img
                                src={google}
                                alt="Google"
                                className="w-5 h-5"
                            />
                            Continue with Google
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-[#0b4074] text-lg hover:bg-[#9785ff] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#0b4074] dark:hover:bg-[#aba2e8] dark:focus:ring-blue-800"
                    >
                        {label}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;
