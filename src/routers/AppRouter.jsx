import React from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'

const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/signup" element={<SignupPage/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter