import { useForm } from "@tanstack/react-form"
import { loginSchema } from "./types/schema"
import type { LoginType } from "./types/schema"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader } from 'lucide-react'
import type { UserEntity } from "@/types/api"
import { mockUserData } from "@/mocks/user-data"

function LoginForm() {

   const defaultUser: LoginType = {
    username: '',
    password: ''
  }

  async function loginHandler(data: LoginType) {
    // perform fetching in here and 
    const user = await new Promise<UserEntity | undefined>((resolve) => {
      setTimeout( () => {
        const user = mockUserData.find((u) => u.username === data.username || u.email === data.username)
        resolve(user)
      }, 500)
    }) 
    
    if(user && user.password === data.password) {
      return user
    }

    return undefined
  } 

  const form = useForm({
    defaultValues: defaultUser,
    validators: { onChange: loginSchema },
    onSubmit: async ({ value }) => {
      await loginHandler(value)
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
      <Label className="text-2xl font-bold self-center mb-6">
        Login.
      </Label>

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