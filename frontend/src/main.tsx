import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Home, Login, Register,Otp,FindARide,
  AdminDashbrd,UserList
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


      <Route path='/findARide' element={<FindARide/>}/>


      <Route path='/dashboard' element={<AdminDashbrd/>}/>
      <Route path='/UserList' element={<UserList/>}/>


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
