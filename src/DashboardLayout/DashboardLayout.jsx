import React from 'react'
import { Outlet } from 'react-router'
import Aside from '../Components/Aside/Aside'

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Aside />
      <main className="flex-1 p-6 bg-gray-50 ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
