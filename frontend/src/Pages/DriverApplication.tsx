
import { Header, Footer, RideInput, RideButton } from "../components/index";
import Image from "../assets/login-img.png";
import { Link } from "react-router-dom";
import { FaClock, FaMapPin, FaRegCircle, FaRegSquare } from "react-icons/fa";
import { MdOutlineMyLocation } from "react-icons/md";

const DriverApplication = () => {
  return (
      <div className="bg-green-50">
        <Header />
        <div className="flex flex-row">
        <div className="flex flex-col items-center justify-center flex-grow w-full p-10">
          {/* Centered Heading */}
          <h1 className="text-center font-medium text-3xl md:text-5xl mb-14">
          Drive. Earn. Enjoy. Repeat.
          </h1>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
          <RideInput placeholder="Enter First Name" />
          <RideInput placeholder="Enter Last Name" />
          </div>
          <div className="flex flex-row gap-2">
          <RideInput placeholder="Enter Mobile Number" />
          <RideInput placeholder="Enter Email Address" />
          </div>
          <div className="flex flex-row gap-2">
          <RideInput placeholder="Enter password" />
          <RideInput placeholder="Confirm password" />
          </div>
          
          </div>
          {/* Buttons in a Row */}
          <div className="flex gap-4 p-14">
            <button className="bg-slate-900 px-7 py-3 text-white">
            Apply to Drive
            </button>
            <button className=" font-semibold px-7 py-3 text-gray-600">
            Do you want a ride?
            </button>
          </div>
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
  






