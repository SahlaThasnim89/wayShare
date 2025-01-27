import {Cards,Data} from '../components/index'


const TopThree = () => {
  return (
    <div className='p-6'>
     <h1 className="text-center font-medium text-4xl mb-6">Top <span className='text-green-600'>3</span> Ride Providers</h1> 
     <p className="text-center mb-8 text-pretty">
     Discover the top three drivers who have consistently excelled in customer satisfaction, timely rides, and<br /> exceptional service. These outstanding individuals stand out for their dedication, reliability, and<br /> professionalism in ensuring every journey is comfortable, efficient, and hassle-free.
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-56'>
        {Data.topDrivers.map((item,index)=>(
          <Cards key={index} image={item.image} name={item.name} completed={item.completedRides} ratings={item.ratings}/>
        ))}
        </div>  
    </div>
  )
}

export default TopThree