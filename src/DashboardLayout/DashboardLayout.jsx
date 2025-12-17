import React from 'react'
import { Outlet } from 'react-router'
import Aside from '../Components/Aside/Aside'

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Aside />
      <main className="flex-1 p-4 md:p-6 bg-gray-50 md:ml-64">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
