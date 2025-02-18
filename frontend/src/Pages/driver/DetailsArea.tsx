
import { Header, Footer, GreenButton, InputField } from "../../components/index";
import Image from "../../assets/login-img.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "@/features/userSlice";
import axios from 'axios'
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, TloginSchema } from "@/lib/LoginTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";



const DetailsArea = () => {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<TRegisterSchema>({ resolver: zodResolver(registerSchema) });
  
  

const user=useSelector(selectUser)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(()=>{
    if(user){
        navigate('/')
    }
  },[navigate,user])

  const onSubmit = async (data: any) => {
    try {
     console.log('ppp')
    } catch (error: any) {
      console.log(error.message);
      toast('you may facing network issue, check your connection');
    }
  };



  return (
    <div>
      <Header />
      <div className="bg-green-50 place-items-center">
        <div className="flex flex-row py-10">
          <div className="w-3/4">
            <h1 className="text-center font-bold pb-11 text-2xl">
              Login to Your Account
            </h1>
            <div className="flex justify-center text-center font-bold border border-green-600 bg-white  hover:bg-green-100">
    </div>
            <p className="text-center">
              Don't have an acconut?{" "}
              <Link to='/register'> 
              <span className="underline text-green-600 font-semibold">
                Sign Up
              </span>
              </Link>
            </p>
            <form onSubmit={handleSubmit(onSubmit,errHandler)} className="flex flex-col gap-3">
            <InputField
                label="Full Name"
                type="text"
                id="name"
                placeholder="Enter your name"
                // {...register("name")}
                // className={`px-2 py-1 ${
                //   errors.name ? "border-red-600" : "border-green-600"
                // }`}
              />
              
              {/* Show error message */}
              {/* {errors.name && (
                <p className="text-red-600 text-sm leading-tight">{errors.name.message}</p>
              )} */}
             
               <Link to='/forgetPassword'> 
                            <p className="text-end text-green-600 font-semibold">Forget password</p>
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

export default DetailsArea;


