import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './auth/Login'
import Layout from './layout/Layout'


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route path='auth'>
          <Route path='login' element={<Login />} />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App