import { type UserEntity } from "@/types/api";
import { createContext, useContext, useReducer, type ReactNode } from "react"

type User = Omit<UserEntity, 'first_name' | 'last_name' | 'role' | 'id'>
type UserEntityNoPassword = Omit<UserEntity, 'password'>

export type ContextType = {
  user: UserEntityNoPassword | null
  login: (user: User) => void
  logout: () => void
}

type AuthReducerAction = 
  | { type: 'LOGIN';  payload: User }
  | { type: 'LOGOUT' }


const AuthContext = createContext<ContextType | undefined>(undefined)

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, dispatch] = useReducer(authReducer, null)

  async function login(userData: User) {
    dispatch({ type: 'LOGIN', payload: userData })
  }

  async function logout() {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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

// Reducer functions
function authReducer(state: UserEntity | null, action: AuthReducerAction): UserEntity | null {
  switch(action.type) {
    case 'LOGIN': 
      return null
    case 'LOGOUT':
      return null
    default: 
      return state
    }
}


//  api call

//  async function loginHandler(data: LoginType) {
//     // perform fetching in here and 
//     const user = await new Promise<UserEntity | undefined>((resolve) => {
//       setTimeout( () => {
//         const user = mockUserData.find((u) => u.username === data.username || u.email === data.username)
//         resolve(user)
//       }, 500)
//     }) 
    
//     if(user && user.password === data.password) {
//       return user
//     }

//     return undefined
// } 