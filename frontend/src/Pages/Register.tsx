import { Link } from "react-router-dom";
import Image from "../assets/login-img.png";
import { Header, Footer, InputField, GreenButton } from "../components/index";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/types";
import {zodResolver} from '@hookform/resolvers/zod'
import { toast } from "sonner"
import axios from 'axios'
import { unknown } from "zod";







const Register = () => {
  const{register,handleSubmit,formState:{errors},
}=useForm({resolver:zodResolver(registerSchema)})

 

const onSubmit=async(data:any)=>{
  try {
    console.log(data)
    const res=await axios.post('/api/register',data)
    toast('Registration successful',res.data)
  } catch (error:any) {
    console.log(error.message)
  }
}

const errhandler=(e:unknown)=>{
  const error=e as {message:string}[];
  Object.values(error).reverse().forEach((err)=>{
      console.log(err.message)
      toast(err.message)
  })
}


  return (
    <div>
      <Header />
      <div className="bg-green-50 place-items-center">
        <div className="w-2/3 flex flex-row py-10">
          <div>
            <h1 className="text-center font-bold pb-11 text-2xl">
              Register Your Account
            </h1>
            <button className="border border-green-600 rounded px-2 py-1 w-full">
              Login with Google
            </button>
            <p className="text-center">
              already have an acconut?{" "}
              <span className="underline text-green-600 font-semibold">
                <Link to="/login"> Login</Link>
              </span>
            </p>
            <form onSubmit={handleSubmit(onSubmit,errhandler)} className="flex flex-col gap-4">
              <InputField
                label="Full Name"
                type="text"
                id="name"
                placeholder="Enter your name"
                register={register("name")}
                className="border border-green-600 rounded px-2 py-1"
              
              />
              <InputField
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your email"
                register={register("email")}
                className="border border-green-600 rounded px-2 py-1"
                
              />
              <InputField
                label="Mobile Number"
                type="text"
                id="mobile"
                register={register("mobile")}
                placeholder="Enter mobile number"
                className="border border-green-600 rounded px-2 py-1"
                
              />
              <div className="flex flex-row gap-4">
                <div>
                  <InputField
                    label="Password"
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    register={register("password")}
                    className="border border-green-600 rounded px-2 py-1"
                    
                  />
                </div>
                <div>
                  <InputField
                    label="Confirm Password"
                    type="password"
                    id="c-password"
                    placeholder="Confirm password"
                    register={register("confirmPassword")}
                    className="border border-green-600 rounded px-2 py-1"
                    
                  />
                </div>
              </div>
              <p className="text-end">Forget password</p>
              <GreenButton>Register</GreenButton>
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

export default Register;
