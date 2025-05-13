import { useAuth } from "@/context/auth_context"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

function AuthLayout() {
  const authContext = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    let timeout = undefined;
    if(authContext.user){
      timeout = setTimeout(() => {
        navigate("/")
      }, 1000)
      return
    } 
    return () => clearTimeout(timeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  


  return (
    <div
      className="bg-slate-100 w-screen h-dvh flex items-center justify-center"
    >
      <Outlet />
    </div>
  )
}

export default AuthLayout