import { createContext, useContext, useReducer, type ReactNode } from "react"

type User = {
  username: string;
  email: string;
}

type Role =  'user' | 'barber' | 'admin'

export type ContextType = {
  user: User | null
  role: Role | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

type StateType = Omit<ContextType, 'login' | 'logout'>

type AuthReducerAction = 
  | { type: 'LOGIN';  payload: { username: string, email: string } }
  | { type: 'LOGOUT' }


// The AuthContext 
const initialState: StateType = {
  user: { username: "mkgnrl", email: "mikognrl@gmail.com"},
  role: "admin",
  isAuthenticated: true,
}

const AuthContext = createContext<ContextType | undefined>(undefined)

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, dispatch] = useReducer(authReducer, initialState)

  function login(userData: User) {
    dispatch({ type: 'LOGIN', payload: userData })
  }

  function logout() {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ ...user, login, logout }}>
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
function authReducer(state: StateType, action: AuthReducerAction): StateType {
  switch(action.type) {
    case 'LOGIN': 
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        role: 'user'
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        role: null
      }
    default: 
      return state
    }
}