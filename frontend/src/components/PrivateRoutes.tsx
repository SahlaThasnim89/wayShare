import { selectUser } from "@/features/userSlice"
import { useSelector } from "react-redux"
import { Navigate,Outlet } from "react-router-dom"


const PrivateRoutes = () => {
    const user=useSelector(selectUser)
    return user?<Outlet/>:<Navigate to='/login' replace/>
}

export default PrivateRoutes