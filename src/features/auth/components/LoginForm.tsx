import { useForm } from "@tanstack/react-form"
import { loginSchema } from "./types/schema"
import type { LoginType } from "./types/schema"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader } from 'lucide-react'
import { useAuth } from "@/context/auth_context"
import { handleLogin } from "../api/login_handler"
import { useState } from "react"
import { useNavigate } from "react-router"

function LoginForm() {
  const [error, setError] = useState<string>("")
  const [hasError, setHasError] = useState<boolean>(false)
  const authContext = useAuth()
  const navigate = useNavigate()
  
   const defaultUser: LoginType = {
    username: '',
    password: ''
  }

  const form = useForm({
    defaultValues: defaultUser,
    validators: { onChange: loginSchema },
    onSubmit: async ({ value }) => {
      setError("")
      setHasError(false)
      const response = await handleLogin(value)

      if(!response) {
        setError("Invalid login credentials")
        setHasError(true)
        return
      }
      authContext.updateLoggedUser(response)
      navigate("/")
    }
  })

  return (
    <form 
      className=" bg-white shadow-md p-8 rounded min-w-96 flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <Label className="text-2xl font-bold self-center mb-5">
        Login.
      </Label>

      {
        hasError 
          ?  <div className="mb-1 flex items-center justify-center text-red-500 bg-red-100/50 border border-red-500 p-2 rounded">
              <Label className="font-semibold text-sm">
                {error}
              </Label>
            </div>
          : ""
      }
     

      <form.Field
        name="username"
        children={(field) => (
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input
              type="text" 
              placeholder="Enter username or email" 
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className={`
                rounded
                ${!field.state.meta.isValid ? 'border-red-400'  : ''}
              `}
            />
            
            {/* <p className="text-xs text-red-500">
              {
                !field.state.meta.isValid && 
                (<em>{field.state.meta.errors[0]?.message}</em>)
              }
            </p>
          */}
          </div>
        )}
      />

      <form.Field
        name="password"
        children={(field) => (
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input 
              type="password" 
              placeholder="Enter password" 
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="rounded"
            />
               
            {/* <p className="text-xs text-red-500">
              {
                !field.state.meta.isValid && 
                (<em>{field.state.meta.errors[0]?.message}</em>)
              }
            </p> */}
          </div>
        )}
      />

      <form.Subscribe
        selector={(state) => [ state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit}
          >
            {isSubmitting ? <Loader className="animate-spin"/> : 'Submit'}
          </Button>
        )}
      >
      </form.Subscribe>
    </form>
  )
}

export default LoginForm