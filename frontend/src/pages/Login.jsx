import React from "react";
import loginImage from "../assets/loginImg.jpg";
import logo from "../assets/pngwing.com.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-no-repeat flex justify-center items-center md:justify-end"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="border w-[70%] h-[60%] min-h-[32rem] min-w-[24rem] max-w-[28rem] md:w-[32%] md:h-[50%] md:min-h-[10rem] md:min-w-[10rem] md:max-w-[48rem] md:mr-15 backdrop-blur-sm border-white/70 rounded-xl flex flex-col justify-around shadow-2xl hover:scale-101 transition-all duration-300 hover:backdrop-blur-xl">
        <div className="flex flex-col items-center justify-center gap-8 md:gap-6 md:mt-6 p-3 md:p-1 mt-3 md:mt-1">
          <p className="text-4xl md:text-3xl font-bold text-white text-shadow-lg">Login</p>
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
          <form action="" className="space-y-4 md:space-y-3">
            <input
              type="text"
              name="username"
              placeholder="enter username"
              className="w-full h-10 md:h-7 px-4 rounded-lg bg-white text-lg md:text-sm outline-none focus:ring-4 md:focus:ring-3 focus:ring-blue-600"
            />
            <input
              type="password"
              name="password"
              placeholder="enter password"
              className="w-full h-10 md:h-7 px-4 rounded-lg bg-white text-lg md:text-sm outline-none focus:ring-4 md:focus:ring-3 focus:ring-blue-600"
            />
            <Link to="/dashboard">
              <button className="w-full h-14 md:h-9 bg-blue-700 text-white rounded-lg text-shadow-lg border border-white/70 border-2 mt-4 md:mt-2 font-bold text-lg md:text-sm hover:bg-blue-700 hover:scale-101 hover:bg-blue-800 transition-all duration-300 shadow-xl">
                Login
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
