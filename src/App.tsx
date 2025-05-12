import { BrowserRouter, Route, Routes } from "react-router";
import Home from "@/pages/Home";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import NotFound from "@/pages/error/NotFound";
import RegisterPage from "@/pages/auth/RegisterPage";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
  
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}/>
        </Route>

        <Route path="/*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}
