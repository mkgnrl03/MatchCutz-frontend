import { Outlet } from "react-router"

function AuthLayout() {
  return (
    <div
      className="bg-slate-100 w-screen h-dvh flex items-center justify-center"
    >
      <Outlet />
    </div>
  )
}

export default AuthLayout