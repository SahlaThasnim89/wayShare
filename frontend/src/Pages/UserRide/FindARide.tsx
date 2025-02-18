import { Header, Footer, RideInput, RideButton } from "../../components/index";
import Image from "../assets/login-img.png";
import { Link } from "react-router-dom";
import { FaClock, FaMapPin, FaRegCircle, FaRegSquare } from "react-icons/fa";
import { MdOutlineMyLocation } from "react-icons/md";



const FindARide = () => {
  return (
    <div className="bg-green-50">
  <Header />
  <div className="flex flex-col gap-2 w-full">
    <div className=" flex flex-col items-center py-20 w-full">
        <div className="w-1/2 justify-start">
    <h1 className="text-start font-medium text-3xl md:text-5xl mb-4">
            Want to Find a Ride?
          </h1>
          </div>
      <div className="flex flex-row justify-between items-center w-full max-w-screen-lg px-4">
        <div className="flex flex-col gap-4 w-full items-end">
          {/* <h1 className="text-center font-medium text-3xl md:text-5xl mb-4">
            Want to Find a Ride?
          </h1> */}
          {/* Pickup Point Input */}
          <div className="relative w-1/2">
            <FaRegCircle className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            <RideInput placeholder="Enter pickup point" />
            <MdOutlineMyLocation className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Destination Input */}
          <div className="relative w-1/2">
            <FaRegSquare className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            <RideInput placeholder="Enter destination" />
            <FaMapPin className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-4">
            <button className="bg-slate-900 px-10 py-3 text-white w-full md:w-auto">
              Search Now
            </button>
          </div>
          <div className="w-full">
            <RideButton
              label={
                <span className="flex items-center space-x-2">
                  <FaClock />
                  <span className="hidden md:block">Schedule a ride</span>
                </span>
              }
            />
          </div>
        </div>
      </div>
    </div>
  <p className="bg-green-50 p-5 text-xs text-gray-500 text-center">"By providing your phone number and clicking 'Request Now,' you consent to receive text messages from Auto Cars. Text messages may be autodialed, and standard messaging rates may apply.<br/> The frequency of text messages varies. You may text STOP to cancel at any time. Your participation is subject to Auto Cars' terms and conditions. Visit our website for more details."</p>
  </div>
  <Footer />
</div>

  );
};

export default FindARide;
