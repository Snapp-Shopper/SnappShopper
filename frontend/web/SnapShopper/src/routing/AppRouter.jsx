import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/Layout/MainLayout'

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route/>
        </Route>
    </Routes>
  )
}
