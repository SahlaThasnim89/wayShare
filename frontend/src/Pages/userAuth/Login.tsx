import { GoogleLogin } from "@react-oauth/google";

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



const Login = () => {


  const {register,handleSubmit,formState:{errors},setError}=useForm<TloginSchema>({resolver:zodResolver(loginSchema)})
  const user=useSelector(selectUser)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(()=>{
    if(user){
        navigate('/')
    }
  },[navigate,user])

  const onSubmit:SubmitHandler<TloginSchema>=async(data)=>{
    try {
      console.log(data,'uyui')
      const res=await axios.post('/api/login',data)
      console.log(res.data)
      if(res.data.isBlocked){
        dispatch(logout());
        toast.error('your account has been blocked')
        return;
      }
      if(res.data.errors){
        const errors=res.data.errors;
      }else{
        toast.success('successfully logged in')        
        dispatch(login({
          name:res.data.name,
          email:res.data.email,
          isBlocked:res.data.isBlocked,
          loggedIn:true,
        }))  
        // navigate('/')
      }  

    } catch (error:any) {
      console.log(error.message)
    }
  }

  const errHandler=(e:any)=>{
    Object.values(e).reverse().forEach((e:any)=>{
      toast.error("sign up failed",{
        description:e.message as string
      })
    })
    
  }

  const googleLogin=async(res:any):Promise<void>=>{
    try {
      console.log('hdjsdf')
      const {credential}=res
      console.log(credential)
      if(!credential){
        toast('Failed to log in with Google');
        return;
      }
      const auth=await axios.post('/api/auth/google',{token:credential})
      if(auth.data.success){
        dispatch(login(auth.data.user)); 
        navigate("/"); 
      } else {
        toast('Google login failed');
      }
    } catch (error:any) {
      console.error(error);
      toast('Error logging in with Google');
    }
  }


  return (
    <div>
      <Header />
      <div className="bg-green-50 place-items-center">
        <div className="flex flex-row py-10">
          <div className="w-3/4">
            <h1 className="text-center font-bold pb-11 text-2xl">
              Login to Your Account
            </h1>
            <div className="flex justify-center text-center font-bold pb-11 text-2xl">
      <GoogleLogin onSuccess={googleLogin} onError={() => toast("Login failed")} />
    </div>
            <p className="text-center">
              Don't have an acconut?{" "}
              <Link to='/register'> 
              <span className="underline text-green-600 font-semibold">
                Sign Up
              </span>
              </Link>
            </p>
            <form onSubmit={handleSubmit(onSubmit,errHandler)} className="flex flex-col gap-4">
              <InputField
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register('email')}
                className="border border-green-600 rounded px-2 py-1"
               
              />
              <InputField
                label="Password"
                type="password"
                id="password"
                placeholder="Enter password"
                className="border border-green-600 rounded px-2 py-1"
                {...register('password')}
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


