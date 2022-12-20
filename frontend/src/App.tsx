import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Editor from './pages/Editor'
import Snippets from './pages/Snippets'

function App() {
  console.log(useAuthContext())
  const { state } = useAuthContext()
  const user = state.user

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Editor />}
        />
        <Route
          path="/snippets"
          element={<ProtectedRoute user={user}><Snippets /></ProtectedRoute>}
        />
        <Route
          path="/snippets/:id"
          element={<ProtectedRoute user={user}><Editor /></ProtectedRoute>}
        />
        <Route
          path="/login"
          element={<RedirectRoute user={user}><LogIn /></RedirectRoute>}
        />
        <Route
          path="/signup"
          element={<RedirectRoute user={user}><SignUp /></RedirectRoute>}
        />
      </Routes>
    </BrowserRouter>

  )
}

export default App

interface Props {
  user: null | {
    email: string;
    token: string;
  }
  children: JSX.Element
}

const ProtectedRoute: React.FC<Props> = ({ children, user }) => {
  console.log("USER")
  console.log(user)
  if (!user) {
    return <Navigate to='/login' replace={true} />
  } else {
    return children
  }
}

const RedirectRoute: React.FC<Props> = ({ children, user }) => {
  console.log(user)
  if (user) {
    return <Navigate to='/' />
  } else {
    return children
  }
}
