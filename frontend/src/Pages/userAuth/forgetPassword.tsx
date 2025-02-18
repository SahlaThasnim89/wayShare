import React, { useState } from 'react'
import { Header, Footer, GreenButton, InputField } from "../../components/index";
import Image from "../../assets/login-img.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { FPasswordSchema,TFPasswordSchema } from '@/lib/FPasswordTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';



const ForgetPassword = () => {

      const {
        register,
        handleSubmit,
        formState: { errors },
        // setError,
      } = useForm<TFPasswordSchema>({
        resolver: zodResolver(FPasswordSchema),
      });

    const onSubmit = async (data: { email: string }) => {
      try {
        console.log(data.email,'hkhkhk')
        const res = await axios.post("/api/forgetPassword", {email: data.email});
          console.log(res,'fghdgjg')
          toast.success(res.data)
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
              Enter your registered email
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
{errors.email?.message && <p className="text-red-600 text-sm">{errors.email.message}</p>}

          
              
                <p>we have sent an verification message to your registered email</p>
              <GreenButton>Submit</GreenButton>
              <p className="text-center">
              want to go back?{" "}
              <span className="underline text-green-600 font-semibold">
                <Link to='/login'>go back</Link>
              </span>
            </p>

            </form>
          </div>
          <div>
            <img className="mt-40 pl-30" src={Image} alt="" />
          </div>
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default ForgetPassword;