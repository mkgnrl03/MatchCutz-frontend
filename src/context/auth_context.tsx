import { mockUserData } from "@/mocks/user-data";
import type {UserEntityNoPassword } from "@/types/api";
import { createContext, useContext, useState, type ReactNode } from "react"

export type ContextType = {
  user: UserEntityNoPassword | undefined
  updateLoggedUser: (response: UserEntityNoPassword) => void
}

const AuthContext = createContext<ContextType | undefined>(undefined)

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserEntityNoPassword | undefined>(mockUserData[0])

  function updateLoggedUser (response: UserEntityNoPassword) {
    setUser(response)
  }

  return (
    <AuthContext.Provider value={{ user, updateLoggedUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(){
  const context = useContext(AuthContext)

  if(!context) {
    throw Error("AuthContext Error: context usage must within it's corresponding provider.")
  }

  return context
}
