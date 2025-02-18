
import { Header, Footer, RideInput, RideButton } from "../../components/index";
import Image from "../assets/login-img.png";
import { Link } from "react-router-dom";
import { FaClock, FaMapPin, FaRegCircle, FaRegSquare } from "react-icons/fa";
import { MdOutlineMyLocation } from "react-icons/md";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/API/user";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/userSlice";
import { Controller, useForm } from "react-hook-form";
import { registerSchema,TRegisterSchema } from "@/lib/RegisterTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyToDrive } from "@/API/Driver";
import axios from "axios";
import { toast } from "sonner";




const DriverApplication = () => {

    const {
      register,
      handleSubmit,
      control,
      formState: { errors },setValue 
    } = useForm<TRegisterSchema>({ resolver: zodResolver(registerSchema),
      defaultValues: {
        name: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
     });
  
    console.log(errors)

  const [userData, setUserData] = useState(null); 

  const user=useSelector(selectUser)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await getUserProfile();
        setUserData(profile); 
        setValue("name", profile?.name || "");
        setValue("mobile", profile?.mobile || "");
        setValue("email", profile?.email || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [setValue]);

  // console.log(userData)


  const onSubmit = async (data: any) => {
    try {
      console.log(data,'ioio')
      const response = await applyToDrive(data);
      console.log(response);
      toast("welcome! complete other details to drive");
    } catch (error: any) {
      console.error("Error:", error.message);
      toast("You may be facing a network issue, check your connection.");
    }
  };

  return (
      <div className="bg-green-50">
        <Header />
        <div className="flex flex-row">
        <div className="flex flex-col items-center justify-center flex-grow w-full p-10">
          {/* Centered Heading */}
          <h1 className="text-center font-medium text-3xl md:text-5xl mb-14">
          Drive. Earn. Enjoy. Repeat.
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} >
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
          <RideInput {...register("name")} value={userData?.name || ''} placeholder="Enter First Name" />
          {/* <RideInput placeholder="Enter Last Name" /> */}
          </div>
          <div className="flex flex-row gap-2">
          <RideInput {...register("mobile")} value={userData?.mobile || ''} placeholder="Enter Mobile Number" />
          <RideInput {...register("email")}  value={userData?.email || ''} placeholder="Enter Email Address" />
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col">
          <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <RideInput {...field} placeholder="Enter password" />
                  )}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
                </div>
                <div className="flex flex-col">
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <RideInput {...field} placeholder="Confirm password" />
                  )}
                />
                 {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
                </div>
          </div>
          
          </div>
          {/* Buttons in a Row */}
          <div className="flex gap-4 p-14">
            <button type="submit" className="bg-slate-900 px-7 py-3 text-white">
            Apply to Drive
            </button>
            <Link to="/findARide">
            <button className=" font-semibold px-7 py-3 text-gray-600">
            Do you want a ride?
            </button>
            </Link>
          </div>
            </form>
        </div>
        <img src="" alt="" />
        </div>
  
        {/* Footer Text */}
        <p className="p-5 text-xs text-gray-500 text-center">
          "By providing your phone number and clicking 'Request Now,' you consent to receive text messages from Auto Cars. Text messages may be autodialed, and standard messaging rates may apply.
          <br />
          The frequency of text messages varies. You may text STOP to cancel at any time. Your participation is subject to Auto Cars' terms and conditions. Visit our website for more details."
        </p>
        <Footer />
      </div>
    );
  };
  
  export default DriverApplication;
  






