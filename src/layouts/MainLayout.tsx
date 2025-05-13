import NavigationLoader from "@/components/common/NavigationLoader"
import { useAuth } from "@/context/auth_context"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router"

function MainLayout() {
  const authContext = useAuth()
  const navigate = useNavigate()
  const [loadContent, setLoadContent] = useState<boolean>(false)

  useEffect(() => {
    let timeout = undefined

    setLoadContent(false)
    if(!authContext.user){
      timeout = setTimeout(() => {
        navigate("/login")
      }, 1000)
      return
    } 

    setLoadContent(true)
    return () => clearTimeout(timeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(!loadContent){
    return <NavigationLoader 
      renderItem={() => (
        <p className="text-md font-normal">
          Navigating to login page...
        </p>
      )}
    />
  }

  return (
    <div>
      MainLayout
      <Outlet />  
    </div>
  )
}

export default MainLayout