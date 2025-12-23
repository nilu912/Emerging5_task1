import React from "react";
import loginImage from "../assets/loginImg.jpg";
import logo from "../assets/pngwing.com.png";

const Login = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-no-repeat flex justify-center items-center md:justify-end"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="border w-[70%] h-[60%] min-h-[32rem] min-w-[24rem] max-w-[28rem] md:w-[34%] md:h-[50%] md:min-h-[10rem] md:min-w-[10rem] md:max-w-[48rem] md:mr-15 backdrop-blur-lg border-white rounded-xl flex flex-col justify-around">
        <div className="flex flex-col items-center justify-center gap-8 md:gap-4 p-3 md:p-1 mt-3 md:mt-1">
          <p className="text-4xl md:text-2xl font-bold text-white">Login</p>
          <div className="flex flex-col justify-center items-center gap-2 md:gap-1">
            <img src={logo} alt="Logo" className="h-[6rem] w-[6rem] md:h-[3rem] md:w-[3rem]" />
            <p className="text-xl font-bold text-blue-800">INDITRONICS</p>
          </div>
        </div>
        <div className="flex flex-col mx-6 gap-6 md:mx-6 md:gap-2">
          <form action="" className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full h-10 md:h-7 px-4 py-1 rounded-lg bg-white text-lg md:text-sm outline-none focus:ring-4 md:focus:ring-3 focus:ring-blue-600"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full h-10 md:h-7 px-4 py-1 rounded-lg bg-white text-lg md:text-sm outline-none focus:ring-4 md:focus:ring-3 focus:ring-blue-600"
            />
            <button className="w-full h-14 bg-blue-500 text-white py-2 rounded-lg mt-4 font-bold text-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
