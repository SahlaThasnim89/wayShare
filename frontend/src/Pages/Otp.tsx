import React from "react";
import {Header,Footer,GreenButton,InputField} from "../components/index";
import Image from "../assets/login-img.png";

const Otp = () => {
  return (
    <div className="">
      <Header />
      <div className="bg-green-50 place-items-center">
        <div className="w-2/4 flex flex-row py-10">
          <div>
            <h1 className="text-center font-bold pb-11 text-2xl">
              {" "}
              Enter OTP here
            </h1>
            <form className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
              <InputField
                  id="otp1"
                  type="number"
                  label=""
                  name="otp1"
                  placeholder=""
                  required={true}
                  className="border border-green-600 rounded px-2 py-1 w-full"
                />
                <InputField
                  id="otp2"
                  type="number"
                  label=""
                  name="otp2"
                  placeholder=""
                  required={true}
                  className='border border-green-600 rounded px-2 py-1 w-full'
                  
                />
                <InputField
                  id="otp3"
                  type="number"
                  label=""
                  name="otp3"
                  placeholder=""
                  required={true}
                  className='border border-green-600 rounded px-2 py-1 w-full'
                />
                <InputField
                  id="otp4"
                  type="number"
                  label=""
                  name="otp4"
                  placeholder=""
                  required={true}
                  className='border border-green-600 rounded px-2 py-1 w-full'
                />
                <InputField
                  id="otp5"
                  type="number"
                  label=""
                  name="otp5"
                  placeholder=""
                  required={true}
                  className='border border-green-600 rounded px-2 py-1 w-full'
                />
                <InputField
                  id="otp6"
                  type="number"
                  label=""
                  name="otp6"
                  placeholder=""
                  required={true}
                  className='border border-green-600 rounded px-2 py-1 w-full'
                />
             
              </div>
              <p className="text-center">
                Didn't get the OTP?{" "}<br></br>
                <span className="underline text-green-600 font-semibold">
                  Resend otp
                </span>
              </p>{" "}
              
              <div className="flex items-end">
              <GreenButton type="submit" className="w-full">
                  Submit
                </GreenButton>
              </div>
            </form>
          </div>
          <div>
            <img className="mt-20 pl-30 w-50 h-50" src={Image} alt="" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Otp;
