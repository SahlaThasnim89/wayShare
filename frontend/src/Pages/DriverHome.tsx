import { Header, Footer, RideInput, RideButton } from "../components/index";
import Image from "../assets/login-img.png";
import { Link } from "react-router-dom";
import { FaClock, FaMapPin, FaRegCircle, FaRegSquare } from "react-icons/fa";
import { MdOutlineMyLocation } from "react-icons/md";



const DriverHome = () => {
    return (
      <div className="bg-green-50 min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow min-h-96 w-full px-4">
          {/* Centered Heading */}
          <h1 className="text-center font-medium text-3xl md:text-5xl mb-14">
          Your Journey, Your Control
          </h1>

          <RideInput/>
          {/* <RideInput/>
          <RideInput/> */}
  
          {/* Buttons in a Row */}
          <div className="flex gap-4">
            <button className="bg-slate-900 px-7 py-3 text-white">
            <Link to='/driver/applyToDrive'>Apply to Drive</Link>
            </button>
            <button className="bg-white font-semibold px-7 py-3 text-black">
            Sign up to Ride
            </button>
          </div>
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
  
  export default DriverHome;
  






