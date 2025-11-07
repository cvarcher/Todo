import React from "react";
import Siderbar from "../../components/Siderbar";
import { signUp } from "../../api/auth";


const Home = () => {
  const getlogin = async () => {
    const todos = await signUp();
  };
 getlogin();

    return (
        <div>
            {/* <AppNavbar/> */}
            {/* <AuthForm/> */}

            <Siderbar/>
            Home
        </div>
    );
};

export default Home;
