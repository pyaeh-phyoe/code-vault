import { createContext, useReducer, useEffect } from 'react'

interface AuthState {
  user: null| Payload
}

interface AuthProviderProps {
  children: React.ReactNode;
}

type Action =
  | { type: "LOGIN"; payload: Payload}
  | { type: "LOGOUT" }
  
interface Payload {
  email: string;
  token: string;
}

const initialState = {
  user: null
}

export const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContext = createContext<{state: AuthState; dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => { } });

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  console.log(localStorage.getItem('user'))
  const [state, dispatch] = useReducer(authReducer, { 
    user: JSON.parse(localStorage.getItem('user') as string)
    // user: null
  })

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user') as string)

  //   if (user) {
  //     dispatch({ type: 'LOGIN', payload: user }) 
  //   }
  // }, [])
  
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}