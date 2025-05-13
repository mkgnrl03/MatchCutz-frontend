import type { LoginDetails, UserEntity } from "@/types/api"
import { mockUserData } from "@/mocks/user-data"

export async function handleLogin(loginData: LoginDetails) {
  return await new Promise<UserEntity | undefined>((resolve) => setTimeout(() => {
    const response = mockUserData.find((user) => {
      if(user.email === loginData.username && user.password === loginData.password){
        return user
      }
      else if(user.username === loginData.username && user.password === loginData.password) {
        return user
      } 
    })
    resolve(response)
  }, 1000))
}