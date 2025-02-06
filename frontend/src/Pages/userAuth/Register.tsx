import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../assets/login-img.png";
import { Header, Footer, InputField, GreenButton } from "../../components/index";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/RegisterTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { login,selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { register } from "@/API/user";



const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });


  const user=useSelector(selectUser)
  const navigate=useNavigate()

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[navigate,user])

  const dispatch=useDispatch()

  const onSubmit = async (data: any) => {
    try {
      navigate('/otp')  
      const res = await axios.post("/api/register", data);
      console.log(res.data)
      localStorage.setItem("email", data.email);
    } catch (error: any) {
      console.log(error.message);
      toast('you may facing network issue, check your connection');
    }
  };

  

  // const errhandler = (e: unknown) => {
  //   const error = e as { message: string }[];
  //   Object.values(error)
  //     .reverse()
  //     .forEach((err) => {
  //       console.log(err.message);
  //       toast(err.message);
  //     });
  // };


  const googleLogin=async(res:any):Promise<void>=>{
    try {
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
        <div className="w-2/3 flex flex-row py-10">
          <div>
            <h1 className="text-center font-bold pb-11 text-2xl">
              Register Your Account
            </h1>
          
            <div className="flex justify-center text-center font-bold text-2xl px-32">
      <GoogleLogin onSuccess={googleLogin} onError={() => toast("Login failed")} />
    </div>
            <p className="text-center pb-6">
              already have an acconut?{" "}
              <span className="underline text-green-600 font-semibold">
                <Link to="/login"> Login</Link>
              </span>
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <InputField
                label="Full Name"
                type="text"
                id="name"
                placeholder="Enter your name"
                {...register("name")}
                className={`px-2 py-1 ${
                  errors.name ? "border-red-600" : "border-green-600"
                }`}
              />
              
              {/* Show error message */}
              {errors.name && (
                <p className="text-red-600 text-sm leading-tight">{errors.name.message}</p>
              )}
              <InputField
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email")} 
                className={`border rounded px-2 py-1 ${
                  errors.email ? "border-red-600" : "border-green-600"
                }`}
              />
      
              {/* Show error message */}
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            
              <InputField
                label="Mobile Number"
                type="text"
                id="mobile"
                {...register("mobile")}
                placeholder="Enter mobile number"
                // className="border border-green-600 rounded px-2 py-1"
                className={`border rounded px-2 py-1 ${
                  errors.mobile ? "border-red-600" : "border-green-600"
                }`}
              />
      
              {/* Show error message */}
               {errors.mobile && (
          <p className="text-red-600 text-sm">{errors.mobile.message}</p>
        )}
              <div className="flex flex-row gap-4">
                <div>
                  <InputField
                    label="Password"
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    {...register("password")}
                    className={`border rounded px-2 py-1 ${
                      errors.password ? "border-red-600" : "border-green-600"
                    }`}
                  />
          
                  {/* Show error message */}
                   {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
                </div>
                <div>
                  <InputField
                    label="Confirm Password"
                    type="password"
                    id="c-password"
                    placeholder="Confirm password"
                    {...register("confirmPassword")}
                    className={`border rounded px-2 py-1 ${
                      errors.confirmPassword ? "border-red-600" : "border-green-600"
                    }`}
                  />
          
                  {/* Show error message */}
                   {errors.confirmPassword && (
              <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
            )}                 
                </div>
              </div>
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
