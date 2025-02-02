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

const EXPIRY_TIME=120

const Otp = () => {

  const {register,handleSubmit,formState: { errors }}=useForm({resolver:zodResolver(otpSchema)})


  const navigate=useNavigate()
  const dispatch=useDispatch();

  const [timeLeft,setTimeLeft]=useState<number>(0)
  const [canResend,setCanResend]=useState<boolean>(false)


const startTimer=(expiryTime:number)=>{
  const timer=setInterval(()=>{
    const remains=Math.max(0,Math.floor((expiryTime-Date.now())/1000))
    setTimeLeft(remains)

    if(remains<=0){
      clearInterval(timer)
      setCanResend(true)
      localStorage.removeItem('otpExpiry')
    }
  },1000)
  return ()=>clearInterval(timer)
}


useEffect(()=>{
  const storedExpiry=localStorage.getItem('otpExpiry')
  const expiryTime=storedExpiry?parseInt(storedExpiry):Date.now()+EXPIRY_TIME*1000

  localStorage.setItem('otpExpiry',expiryTime.toString())
  setCanResend(false)
  return startTimer(expiryTime)
},[])

  const onSubmit=async(data:any)=>{
    try {
      const otp = Object.values(data).join("");
      // const otp = data.otp1+data.otp2+data.otp3+data.otp4+data.otp5+data.otp6;
      const email = localStorage.getItem("email");
      const res=await axios.post('/api/otp', { email, otp })
      // console.log(res)
      if(res.data.errors){
        const errors=res.data.errors;
        toast(errors)
      }else{
        toast.success('registration successful')
        dispatch(login({
          name:res.data.user.name,
          email:res.data.user.email,
          // image:res.data.image,
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
        console.log('ioioioioioioio')
        setCanResend(false)
        setTimeLeft(EXPIRY_TIME)
        localStorage.setItem('otpExpiry',(Date.now()+EXPIRY_TIME*1000).toString())
        const email=localStorage.getItem('email')
        if (!email) {
          console.log("No email found in localStorage");
          return;
        }
        console.log(email)
        const res=await axios.post('/api/resend-otp',{email})
        toast('new otp has been sent to your registered mail')
        // console.log('resennt otp')
        console.log(res)
        if(res.data.errors){
          const errors=res.data.errors;
          toast(errors)
        }else{
          toast.success('registration successful')
          dispatch(login({
            name:res.data.user.name,
            email:res.data.user.email,
            // image:res.data.image,
            loggedIn:true,
          }))
        return startTimer(Date.now() + EXPIRY_TIME * 1000);
        //   navigate('/')
          
        }
      } catch (error:any) {
        console.log("error",error.message)
      }

    },500),[]
  )



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.value.length === 1 && index < 5) {
      document.getElementById(`otp${index + 2}`)?.focus();
    }
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && index > 0) {
      document.getElementById(`otp${index}`)?.focus();
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
                 <span className="underline text-green-600 font-semibold cursor-pointer" onClick={resendOTP}>
                    Resend OTP
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
