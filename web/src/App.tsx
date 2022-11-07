import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App