import { useState } from "react";
import { FaEnvelopeOpen, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handleError } from "../util";
import { handleSuccess } from "../util";
const Login = () => {
    const navigateTo =useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `http://localhost:8080/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error,user } = result;
            if (success) {
              localStorage.setItem('token', jwtToken);
              localStorage.setItem('loggedInUser', name);
              localStorage.setItem("userId", user._id);


                handleSuccess(message);
                setTimeout(() => {
                    navigateTo('/dashboard')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
    


  return (
    <div className="">
      <div className="max-w-[960px] bg-black-dark grid grid-cols-2 items-center gap-20 p-5 rounded-2xl">
        <div>
          <img src="../signup-background.svg" alt="" />
          <img src="../teamwork.svg" alt="" className="absolute top-36" />
        </div>
        <div className="max-w-80 grid gap-5">
          <h1 className="text-5xl font-bold text-white">Login</h1>
          <p className="text-dull-white">
            Access to build and manage a simple task tracking system.
          </p>
          <form onSubmit={handleLogin} action="" className="space-y-6 ">
            <div className="relative">
              <div className="absolute top-1 left-1 bg-white-medium rounded-full p-2 flex items-center justify-center text-blue-300">
                <FaEnvelopeOpen />
              </div>
              <input
                onChange={handleChange} 
                name="email"
                type="email"
                placeholder="Email Address"
                className="w-80 bg-white-light py-2 px-12 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                value={loginInfo.email}
              />
            </div>
            <div className="relative">
              <div className="absolute top-1 left-1 bg-white-medium rounded-full p-2 flex items-center justify-center text-blue-300">
                <FaLock />
              </div>
              <input
                onChange={handleChange} 
                name="password"
                type="text"
                placeholder="Password"
                className="w-80 bg-white-light py-2 px-12 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg"
                value={loginInfo.password}
              />
            </div>
            <button className="bg-gradient-to-r from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-2">
              Sign in
            </button>
          </form>
          <div className="text-dull-white border-t border-white-light pt-4 space-y-4 text-sm">
                <p>Don't have an account? <button className="text-neon-blue font-semibold cursor-pointer"
                onClick={()=>navigateTo('/auth/Signup')}>Sign Up</button></p>
                </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
