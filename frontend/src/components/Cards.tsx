import { FeatureCardItem } from "../types/FeatureCardItem"
import { FaRegStar,FaStar } from "react-icons/fa";

const Cards = ({logo,title,para,completed,ratings,image,name}:FeatureCardItem) => {
  return (
        <div className='border-box shadow-md border-2 border-green-50 rounded-lg flex flex-col items-center'>
          {logo?
          <div className='w-28 h-20 mb-4 pt-16 p-2'>
            <img src={logo} alt={title} />
            </div>
            :
            <div className='w-full  h-20 mb-4'>
            <img src={image} alt={title} />
            </div>
}
        {logo?
        <div className="text-center m-2 py-5 mt-20">
            <h1 className="font-bold text-xl text-balance">{title}</h1>
            <p className="text-center text-gray-600 text-balance">{para}</p>
            </div>
            :
            <div className="mt-32 pb-5">
            <h1 className="text-center font-bold text-xl my-4">{name}</h1>
            <p className="text-start text-gray-950 font-semibold">Ride completed : {completed}</p>
            <p className="text-start text-gray-950 font-semibold">Rating : {ratings}</p>
            
            <span className="flex flex-row gap-2 items-end m-3"><FaStar className="text-green-600"/><FaStar className="text-green-600" /><FaStar className="text-green-600" /><FaRegStar /><FaRegStar /></span>
            </div>
        }
        </div>
  )
}

export default Cards