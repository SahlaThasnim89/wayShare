import { Header, Footer, GreenButton, InputField } from "../components/index";
import Image from "../assets/login-img.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/userSlice";

const Login = () => {
  const user=useSelector(selectUser)
  const navigate=useNavigate()

  // useEffect(()=>{
  //   if(user){
  //       navigate('/')
  //   }
  // },[navigate,user])


  return (
    <div>
      <Header />
      <div className="bg-green-50 place-items-center">
        <div className="flex flex-row py-10">
          <div className="w-3/4">
            <h1 className="text-center font-bold pb-11 text-2xl">
              Login to Your Account
            </h1>
            <button className="border border-gray-300 rounded px-2 py-1 w-full">
              Login with Google
            </button>
            <p className="text-center">
              Don't have an acconut?{" "}
              <Link to='/register'> 
              <span className="underline text-green-600 font-semibold">
                Sign Up
              </span>
              </Link>
            </p>
            <form className="flex flex-col gap-4">
              <InputField
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your email"
                
                className="border border-green-600 rounded px-2 py-1"
                required
              />
              <InputField
                label="Password"
                type="password"
                id="password"
                placeholder="Enter password"
                className="border border-green-600 rounded px-2 py-1"
                required
              />
               <Link to='/forgetPassword'> 
                            <p className="text-end">Forget password</p>
                            </Link>

              <GreenButton>Login</GreenButton>

            </form>
          </div>
          <div>
            <img className="mt-40 pl-30" src={Image} alt="" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;


