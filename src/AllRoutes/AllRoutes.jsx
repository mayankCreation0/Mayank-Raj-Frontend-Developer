import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../Components/About'
import Navbar from '../Components/Navbar'
import LoginPage from '../Pages/Login'
import SignupPage from '../Pages/Signup'

function AllRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
            <About />
        </>
    )
}

export default AllRoutes
