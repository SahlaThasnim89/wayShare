import React, { useCallback, useEffect, useState } from "react";
import {Header,Footer,GreenButton,InputField} from "../components/index";
import Image from "../assets/login-img.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/lib/OtpTypes";
import { useNavigate } from "react-router-dom";
import { login, selectUser } from "@/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {debounce} from 'lodash';
import { toast } from "sonner";



const Otp = () => {

  const {register,handleSubmit,formState: { errors }}=useForm({resolver:zodResolver(otpSchema)})


  const navigate=useNavigate()
  const dispatch=useDispatch();

  const [timeLeft,setTimeLeft]=useState(60)
  const [canResend,setCanResend]=useState(false)


  useEffect(()=>{
    if(timeLeft>0){
      const timer=setInterval(()=>{
        setTimeLeft((prev)=>prev-1)
      },1000)
      return ()=>clearInterval(timer)
    }else{
      setCanResend(true)
    }
  },[timeLeft])


  const onSubmit=async(data:any)=>{
    try {
      const otp = data.otp1+data.otp2+data.otp3+data.otp4+data.otp5+data.otp6;
      const email = localStorage.getItem("email");
      const res=await axios.post('/api/otp', { email, otp })
      if(res.data.errors){
        const errors=res.data.errors;
        toast(errors)
      }else{
        toast.success('registration successful')
        dispatch(login({
          name:res.data.name,
          email:res.data.email,
          image:res.data.image,
          loggedIn:true,
        }))
        navigate('/')
        
      }
    } catch (error:any) {
      console.log(error.response.data.message);
      toast(error.response.data.message)
    }
  }

  const resendOTP=useCallback(
    debounce(async()=>{
      try {
        setCanResend(false)
        setTimeLeft(60)
        const email=localStorage.getItem('email')
        if (!email) {
          console.log("No email found in localStorage");
          return;
        }
        console.log(email)
        const res=await axios.post('/api/resend-otp',{email})
        console.log('resennt otp')
        console.log(res.data)
        if(res.data.errors){
          const errors=res.data.errors;
          toast(errors)
        }else{
          toast.success('registration successful')
          dispatch(login({
            name:res.data.name,
            email:res.data.email,
            image:res.data.image,
            loggedIn:true,
          }))
          navigate('/')
          
        }
      } catch (error:any) {
        console.log("error",error.message)
      }

    },60000),[]
  )



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
        if (value.length === 1 && index < 5) {
      const nextInput = document.getElementById(`otp${index + 2}`);
      if (nextInput) nextInput.focus();
    }
  };
  
  
  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && index > 0) {
      const prevInput = document.getElementById(`otp${index}`);
      if (prevInput) prevInput.focus();
    }
  };
  

  const errhandler = (e: unknown) => {
    const error = e as { message: string }[];
    Object.values(error)
      .reverse()
      .forEach((err) => {
        console.log(err);
        toast(err.message);
      });
  };


  return (
    <div className="">
      <Header />
      <div className="bg-green-50 place-items-center">
        <div className="w-2/4 flex flex-row py-28">
          <div>
            <h1 className="text-center font-bold pb-11 text-2xl">
              {" "}
              Enter OTP here
            </h1>
            <form onSubmit={handleSubmit(onSubmit, errhandler)} className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
              {Array.from({ length: 6 }, (_, i) => (
  <div key={i} className="flex flex-col">
    <InputField
      id={`otp${i + 1}`}
      // type="number"
      label=""
      {...register(`otp${i + 1}`)}
      className="border border-green-600 rounded py-3 w-5/6 text-center"
      maxLength={1}
      onChange={(e) => handleChange(e, i)}
    onKeyDown={(e) => handleBackspace(e, i)}
    />
   
  </div>
))}
    
              </div>

              <p className="text-center text-gray-700">
                {timeLeft > 0 ? `Request again in ${timeLeft} seconds` : "Didn't get the OTP?"}
              </p>
             
              {canResend&&(
              <p className="text-center">
                <span className="underline text-green-600 font-semibold cursor-pointer" onClick={resendOTP} disabled={!canResend}>
                  Resend otp
                </span>
              </p>
              )} 
              
              <div className="flex items-end">
              <GreenButton type="submit" className="w-full">
                  Submit
                </GreenButton>
              </div>
            </form>
          </div>
          <div>
            <img className="mt-20 pl-30" src={Image} alt="" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Otp;
