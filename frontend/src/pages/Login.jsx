import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import loginImage from "../assets/loginImg.jpg";
// import loginImage from "../assets/5065282.jpg";
import loginImage from "../assets/9142209.jpg";

import logo from "../assets/pngwing.com.png";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import { useAuth } from "../context/authContext.jsx";
const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const inputHandler = (e) => {
    setPassword(e.target.value);
  };
  const showPassHandler = (e) => {
    setShowPass(!showPass);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    login({ userName, password });
  };
  useEffect(()=>{
    if(user){
      navigate('/dashboard');
    }
  },[user])
  return (
    <div
      className="h-screen w-screen bg-cover bg-no-repeat flex justify-center items-center md:justify-end overflow-hidden"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="border w-[70%] h-[40%] min-h-[30rem] min-w-[20rem] max-w-[28rem] md:w-[52%] lg:w-[42%] xl:w-[32%] md:min-h-[28rem] lg:min-h-[28rem] xl:min-h-[28rem] xl:max-w-[28rem] md:h-[50%] md:min-h-[10rem] md:min-w-[10rem] md:max-w-[48rem] md:mr-15 backdrop-blur-sm border-white/70 rounded-xl flex flex-col justify-around shadow-2xl hover:scale-101 transition-all duration-300 hover:backdrop-blur-xl hover:border-white/50">
        <div className="flex flex-col items-center justify-center gap-8 md:gap-6 md:mt-6 p-3 md:p-1 mt-3 md:mt-1">
          <p className="text-4xl md:text-3xl font-bold text-white text-shadow-lg">
            Login
          </p>
          <div className="flex flex-col justify-center items-center gap-2 md:gap-1">
            <img
              src={logo}
              alt="Logo"
              className="h-[6rem] w-[6rem] md:h-[3rem] md:w-[3rem]"
            />
            <p className="text-xl md:text-md font-bold text-blue-800 font-outline-2 text-shadow-lg">
              INDITRONICS
            </p>
          </div>
        </div>
        <div className="flex flex-col mx-6 gap-6 md:mx-6 md:mb-8">
          <form onSubmit={onSubmitHandler} className="space-y-4 md:space-y-3">
            <input
              type="text"
              name="username"
              placeholder="enter username"
              className="w-full h-10 md:h-7 px-4 rounded-lg bg-white text-lg md:text-sm outline-none focus:ring-4 md:focus:ring-3 focus:ring-blue-600"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="enter password"
                className="w-full h-10 md:h-7 px-4 rounded-lg bg-white text-lg md:text-sm outline-none focus:ring-4 md:focus:ring-3 focus:ring-blue-600"
                value={password}
                onChange={inputHandler}
                required
              />
              <button
                type="button"
                className="absolute -translate-x-9 translate-y-2 md:-translate-x-7 md:translate-y-1 outline-none"
                onClick={showPassHandler}
              >
                {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {/* <Link to="/dashboard"> */}
            <button
              type="submit"
              className="w-full h-14 md:h-9 bg-blue-700 text-white rounded-lg text-shadow-lg border border-white/70 border-2 mt-4 md:mt-2 font-bold text-lg md:text-sm hover:bg-blue-700 hover:scale-101 hover:bg-blue-800 transition-all duration-300 shadow-xl cursor-pointer"
            >
              Login
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
