import React from 'react'
import { Outlet } from 'react-router'
import Aside from '../Components/Aside/Aside'

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Aside />
      <main className="flex-1 p-6 bg-gray-50 ml-64">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
