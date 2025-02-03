import { FaCar, FaMoneyBillWave, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
Link

const RedirectButton = () => {
  return (
    <div>
      <div className="sm:mx-64 bg-white rounded-2xl py-10 flex justify-around items-center gap-6">
        <div className="text-center border-green-100 border-2 py-10 sm:px-20 w-1/3 rounded-2xl">
        <Link to="/findARide">
          <div className="sm:hidden text-green-600 text-3xl">
            <FaSearch />
          </div>
          <p className="hidden sm:block text-green-600 text-2xl font-semibold">
            Find a ride
          </p>
        </Link>
        </div>
        <div className="text-center border-green-100 border-2 py-10 w-1/3 px-20 rounded-2xl">
        <Link to="/findARide">
          <div className="sm:hidden text-green-600 text-3xl">
            <FaCar />
          </div>
          <p className="hidden sm:block text-green-600 text-2xl font-semibold">
            Start A ride
          </p>
        </Link>
        </div>
        <div className="text-center border-green-100 border-2 w-1/3 py-10 px-20 rounded-2xl">
        <Link to="/driver">
          <div className="sm:hidden text-green-600 text-3xl">
            <FaMoneyBillWave />
          </div>
          <p className="hidden sm:block text-green-600 text-2xl font-semibold">
            Earn with us
          </p>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default RedirectButton;
