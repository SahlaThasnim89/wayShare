import React from 'react'
import { Header, Footer, GreenButton, InputField } from "../components/index";
import Image from "../assets/login-img.png";
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (

         <div>
      <Header />
      <div className="bg-green-50 place-items-center">
        <div className="flex flex-row py-10">
          <div className="w-3/4">
            <h1 className="text-center font-bold pb-11 text-2xl">
              Enter your registered email
            </h1>
            <form className="flex flex-col gap-4">
              <InputField
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your email"
                
                className="border border-green-600 rounded px-2 py-1"
                required
              />
              
                <p>an otp will get to your registered email</p>
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

export default ProfilePage