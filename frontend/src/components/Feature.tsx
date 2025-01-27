import {Cards,Data} from '../components/index'

const Feature = () => {
  return (
    <div className='p-10'>
     <h1 className="text-center font-medium text-4xl mb-10 md:my-6">Our Features</h1> 
     <p className="text-center mb-8 text-balance">
        Our service ensures fast rides, low cost, and top-notch safety. Enjoy quick and affordable travel with the<br />
        confidence that your journey is secure every step of the way.
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 md:mx-56 mx-52'>
        {Data.features.map((item,index)=>(
          <Cards key={index} logo={item.logo} title={item.title} para={item.para}/>
        ))}
        </div>  
    </div>
  )
}

export default Feature