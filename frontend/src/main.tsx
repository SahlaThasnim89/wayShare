import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Home, Login, Register,Otp } from './Pages/index';





const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/otp' element={<Otp/>}/>
      <Route path='/login' element={<Login/>}/>
    </Route>
  )
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
