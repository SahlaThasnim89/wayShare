import {
  Header,
  Footer,
  RideInput,
  RideButton,
  Feature,
  CountData,
  RedirectButton,
  TopThree,
} from "../components/index";
import Image from "../assets/home-img.png";
import { FaClock, FaMapPin } from "react-icons/fa6";
import { FaRegCircle, FaRegSquare } from "react-icons/fa";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { MdOutlineMyLocation } from "react-icons/md";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "@/features/userSlice";
import { useSelector } from "react-redux";


const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  // useEffect(()=>{
  //   if(user){
  //     navigate('/')
  //   }
  //   console.log(user)
  // },[navigate,user])

  return (
    <div>
      <Header />
      <>
        <div className="bg-green-50 flex flex-col items-center py-24  ">
          <div className="w-11/12 md:w-3/4 flex flex-row justify-between items-center">
            <div className="w-full md:w-2/4 flex flex-col gap-4">
              <h1 className="text-center font-medium text-3xl md:text-5xl mb-2 whitespace-nowrap">
                Need a Quick ride?
              </h1>
              {/* Pickup Point Input */}
              <div className="relative">
                <FaRegCircle className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white" />
                <RideInput placeholder="Enter pickup point" />
                <MdOutlineMyLocation className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
                <div className="absolute top-10 bottom-0 left-5 w-px bg-white transform -translate-x-1/2" />
              </div>

              {/* Destination Input */}
              <div className="relative md:w-full">
                <FaRegSquare className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white" />
                <RideInput placeholder="Enter destination" />
                <FaMapPin className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
                <div className="absolute top-0 bottom-10 left-5 w-px bg-white transform -translate-x-1/2" />
              </div>
              {/* Buttons */}
                {user?
                 <div className="flex justify-end mt-4">
                <button className="bg-slate-900 px-10 py-3 text-white w:full md:w-auto">
                  Request Now
                </button>
                </div>
                : <Link to="/login"><div className="flex justify-end mt-4">
                  <button className="bg-slate-900 px-10 py-3 text-white w:full md:w-auto">
                 Request Now
              </button>

              </div>
              </Link>
}
{user?(   <div className="w-full md:w-auto">
                <RideButton
                  label={
                    <span className="flex items-center space-x-2">
                      <FaClock />
                      <span className="hidden md:block">Schedule a ride</span>
                    </span>
                  }
                />
              </div>
            ):(
              <Link to="/login">
            <div className="w-full md:w-auto">
                <RideButton
                  label={
                    <span className="flex items-center space-x-2">
                      <FaClock />
                      <span className="hidden md:block">Schedule a ride</span>
                    </span>
                  }
                />
              </div>
              </Link>
            )}
              
            </div>

            {/* Image */}
            <div className="pl-10 hidden md:block">
              <img src={Image} alt="Ride Image" className="w-full" />
            </div>
          </div>
        </div>
      </>

      {/* Feature */}
      <>
        <div className="place-items-center">
          <Feature />
        </div>
      </>

      {/* count */}
      <>
        <CountData />
      </>

      {/* buttons */}
      {user ? (
        <>
          <RedirectButton />
        </>
      ) : (
        <></>
      )}

      {/* top three */}
      <div className="my-6 mx">
        <TopThree />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
