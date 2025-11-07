import React from "react";
import "flowbite";
import google from "../assets/google.png";

const Form = ({ label }) => {
    const handleSubmit=(e)=>{
        e.preventDefault();

        //form submission logic here
    }

    return (
        <div class="bg-[#fcfaf8] min-h-screen flex flex-col">
            <h1 class="text-4xl font-bold mt-20 ml-10 md:text-left flex items-center">
                <span class="text-[#0b4074] mr-1">DO.</span> DO
            </h1>

            <h1 class="text-4xl font-bold mt-20 ml-10 md:text-left flex items-center">
                {label.toLowerCase() == "sign up" ? (
                    <h2>Welcome Back!</h2>
                ) : (
                    <h2>Welcome!</h2>
                )}
            </h1>
            <div class=" flex flex-1">
                <form class="flex flex-col justify-center w-1/2 md:w-[600px] p-10 align-center lg:full lg:align-center" onSubmit={handleSubmit}>
                    {/* <h2>{label}</h2> */}
                    <div class="grid gap-6 mb-6 md:grid-cols-2"></div>
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-md  ">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            class=" border border-gray-100 text-gray-900 text-lg p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark: dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-200"
                            placeholder="Enter you Email"
                            required
                        />
                    </div>

                    <div class="mb-6">
                        <label for="password" class="block mb-2 text-md ">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            class=" border  text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark: dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div class="flex items-start mb-6">
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
                        class="text-white bg-[#0b4074] text-lg hover:bg-[#9785ff] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#0b4074] dark:hover:bg-[#aba2e8] dark:focus:ring-blue-800"
                    >
                        {label}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;
