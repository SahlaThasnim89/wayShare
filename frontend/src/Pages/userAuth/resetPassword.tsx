import React from 'react'
import { Header, Footer, GreenButton, InputField } from '../../components/index';
import Image from "../../assets/login-img.png";
import { Link, useNavigate } from 'react-router-dom';
import { RPasswordSchema,TRPasswordSchema } from '@/lib/RPasswordTypes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import axios from 'axios';





const ResetPassword = () => {
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<TRPasswordSchema>({ resolver: zodResolver(RPasswordSchema) });
    

      const navigate=useNavigate()

      const params=new URLSearchParams(window.location.search)
      const token = params.get("token");
      const email = params.get("email");

      const onSubmit = async (data: any) => {
        try {
          console.log(data.password)
          const updatedProfile = await axios.post("/api/resetPassword", {
            password:data.password,
            email,
            token,
          });
            // console.log(updatedProfile,'fghdgjg')
            if (updatedProfile.status === 200) {
              toast.success(updatedProfile.data.message || "new Password successfully!");
              navigate('/login')
            } else {
              toast.error("Something went wrong. Please try again.");
            }
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
     <div className="m-6 bg-white p-4 border-2 border-green-100 w-full">
              <h1 className="text-3xl font-semibold mt-1">Change Password</h1>

              <div className="max-w-xl w-[64rem] my-2">
                <h1 className="text-md font-medium mb-4">
                  Set up your new password
                </h1>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
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
                  <div className="flex justify-start">
                    {/* <Link to="/checkup"> */}
                      <button className="bg-slate-900 px-10 py-3 text-white w:full md:w-auto">
                        Update Password
                      </button>
                    {/* </Link> */}
                  </div>
                </form>
              </div>
            </div>
     </div>
</div>
     <Footer />

   </div>
 )
}

export default ResetPassword;