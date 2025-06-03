import React from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <>
            <Navbar />
            {/* <main className="container mx-auto p-4"> */}
                <Outlet />
            {/* </main> */}
            <Footer />
        </>
    )
}

export default MainLayout