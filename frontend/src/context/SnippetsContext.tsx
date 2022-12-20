import { createContext, useReducer } from 'react'

// type AppState = typeof initialState;

type Action =
  | { type: 'SET_SNIPPETS'; payload: Project[] }
  | { type: 'CREATE_SNIPPET'; payload: Project }
  | { type: 'DELETE_SNIPPET'; payload: Project }
  | {type: 'FILTER_PROJECT'; payload: any};

interface SnippetsState {
  snippets: Project[];
}

interface InputProviderProps {
  children: React.ReactNode;
}


interface Project {
  _id: string;
  title: string;
  html: string;
  css: string;
  js: string;
  createdAt: string;
  updatedAt: string;
}

const initialState = {
  snippets: [],
}

export const snippetsReducer = (state: SnippetsState, action: Action) => {
  switch (action.type) {
    case 'SET_SNIPPETS':
      return { 
        snippets: action.payload 
      }
    case 'CREATE_SNIPPET':
      return { 
        snippets: [action.payload, ...state.snippets] 
      }
    case 'DELETE_SNIPPET':
      return { 
        snippets: state.snippets.filter(p => p._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const SnippetsContext = createContext<any>(undefined)

export const SnippetsContextProvider = ({ children } : InputProviderProps) => {

  const [state, dispatch] = useReducer(snippetsReducer, initialState)
  
  return (
    <SnippetsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </SnippetsContext.Provider>
  )
}
