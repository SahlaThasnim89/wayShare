import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Home, 
  Login, 
  Register,
  Otp,
  ForgetPassword,
  ResetPassword,
  
  UserProfile,
  
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


 } from './Pages/index';
import { Provider } from 'react-redux';
import {store} from './store/store.ts';







const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/otp' element={<Otp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgetPassword' element={<ForgetPassword/>}/>
      <Route path='/resetPassword' element={<ResetPassword/>}/>


      <Route path='/Profile' element={<UserProfile/>}/>



      <Route path='/findARide' element={<FindARide/>}/>

      <Route path='/driver' element={<DriverHome/>}/>
      <Route path='/driver/applyToDrive' element={<DriverApplication/>}/>



      <Route path='/admin/login' element={<AdminLogin/>}/>



      <Route path='/admin/dashboard' element={<AdminDashbrd/>}/>
      <Route path='/admin/UserList' element={<UserList/>}/>

      <Route path='/admin/DriverList' element={<DriversList/>}/>
      <Route path='/admin/DriverRequests' element={<DriverRequests/>}/>
      <Route path='/admin/applicationDetails' element={<DriverApplicationDetails/>}/>

      <Route path='/admin/RidesList' element={<RidesList/>}/>


    </Route>
  )
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
