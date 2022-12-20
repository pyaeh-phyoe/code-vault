import { useAuthContext } from './useAuthContext'
import { useSnippetsContext } from './useSnippetsContext'

export const useLogout = () => {
  const { dispatch: dispatchAuth } = useAuthContext()
  const { dispatch: dispatchSnippets } = useSnippetsContext()

  const logout = () => {
    localStorage.removeItem('user')
    dispatchAuth({ type: 'LOGOUT' })
    dispatchSnippets({ type: 'SET_WORKOUTS', payload: null })
  }
  return { logout }
}