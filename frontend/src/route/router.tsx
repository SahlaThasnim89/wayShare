import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Home, 
  Login, 
  Register,
  Otp,
  ForgetPassword,
  ResetPassword,
  
  Overview,
  UserProfile,
  ChangePassword,
  EditProfile,
  
  FindARide,


  DriverHome,
  DriverApplication,

  AdminLogin,
  AdminDashbrd,
  UserList,
  DriversList,
  DriverRequests,
  DriverApplicationDetails,
  RidesList


 } from '../Pages/index';
 import PrivateRoutes from '../components/PrivateRoutes.tsx'
 import App from '../App.tsx'


 
const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App/>}>
        <Route index={true} element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/otp' element={<Otp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgetPassword' element={<ForgetPassword/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>
  
        <Route path='/admin/login' element={<AdminLogin/>}/>
  
        
        {/* privteRoutes */}
        <Route element={<PrivateRoutes/>}>
        <Route path='/Overview' element={<Overview/>}/>
        <Route path='/Profile' element={<UserProfile/>}/>
        <Route path='/changePassword' element={<ChangePassword/>}/>
  
        <Route path='/editProfile' element={<EditProfile/>}/>
  
  
  
        <Route path='/findARide' element={<FindARide/>}/>
  
  
        <Route path='/driver' element={<DriverHome/>}/>
        <Route path='/driver/applyToDrive' element={<DriverApplication/>}/>
  
  
  
  
  
  
        <Route path='/admin/dashboard' element={<AdminDashbrd/>}/>
        <Route path='/admin/UserList' element={<UserList/>}/>
  
        <Route path='/admin/DriverList' element={<DriversList/>}/>
        <Route path='/admin/DriverRequests' element={<DriverRequests/>}/>
        <Route path='/admin/applicationDetails' element={<DriverApplicationDetails/>}/>
  
        <Route path='/admin/RidesList' element={<RidesList/>}/>
        </Route>
  
      </Route>
    )
  )
  
  export default router;