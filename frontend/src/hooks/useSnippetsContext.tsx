import { SnippetsContext } from '../context/SnippetsContext'
import { useContext } from 'react'

export const useSnippetsContext = () => {
  const context = useContext(SnippetsContext)

  if(!context) {
    throw Error('useWorkoutsContext must be used inside a WorkoutsContextProvider')
  }

  return context
}