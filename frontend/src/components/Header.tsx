import { IoIosNotificationsOutline } from "react-icons/io";
import { name, logo } from "../assets/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "@/features/userSlice";
import axios from 'axios'
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useNavigate } from "react-router-dom";
import { CircleUser } from "lucide-react";
import { toast } from "sonner";








const Header = () => {
  const user=useSelector(selectUser)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogOut = async (e:any) => {
    try {
      const res = await axios.post("/api/logout");
      console.log(res.data)
      if (res.data.errors) {
        console.log("something went wrong")
        // toast.error("something went wrong");
      } else {
        dispatch(logout());
        console.log("successfully logged out")
        toast.success("successfully logged out");

        setTimeout(()=>{
          if(location.pathname.includes('/admin')){
            navigate('/admin/login')
          }else{
            navigate('/login')
          }
        },100)

      }
    } catch (error:any) {
      console.log(error.message);
    }
  };





  return (
    <>
      <div className="min-h-full m-0 sticky top-0 z-50">
        <nav className="bg-white border-b-2 border-black-500">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0 flex flex-row gap-2">
                  <img className="h-10 w-10" src={logo} alt="Your Company" />
                  <img className="h-10" src={name} alt="Your Company" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                  <Link to='/'>
                    <a
                      href="#"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:text-md"
                    >
                      Home
                    </a>
                    </Link>
                    <a
                      href="#"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:text-md"
                    >
                      Dashboard
                    </a>
                    {/* <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:text-white">Resources</a>
              <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:text-white">Pricing</a> */}
                  </div>
                </div>
              </div>
              {/* {user?(
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6 gap-5">
                  <span>
                    <IoIosNotificationsOutline size={36} />
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="relative ml-3">
                        <div>
                          <button
                            type="button"
                            className="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                            id="user-menu-button"
                            aria-expanded="false"
                            aria-haspopup="true"
                          >
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="size-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => handleLogOut(e)}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              ):(<button>Login</button>
              ) */}

{/* } */}


           
          {user  ? (
            <div className="flex flex-row">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="rounded-full flex items-center justify-center">
                        {/* <span>
                          {user.name
                            .split(" ")
                            .map((word) => word.charAt(0).toUpperCase())
                            .join("")}
                        </span> */}
                      </div>
                    )}
                    {/* <CircleUser className="h-5 w-5" /> */}
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link to='/Profile'>
                  <DropdownMenuItem>
                    My Account
                  </DropdownMenuItem>
                  </Link>
                  
                  <DropdownMenuItem onClick={(e) => handleLogOut(e)}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link to="/login">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
                      <CircleUser className="h-5 w-5" />
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Login</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          )}
              <div className="-mr-2 flex md:hidden">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  <svg
                    className="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              <a
                href="#"
                className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                aria-current="page"
              >
                Home
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Dashboard
              </a>
              {/* <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Resources</a>
        <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Pricing</a> */}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img
                    className="size-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    tom@example.com
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
