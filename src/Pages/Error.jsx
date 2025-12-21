import React from 'react'
import { Link } from 'react-router'
import { Droplet, Home, RefreshCcw } from 'lucide-react'

const Error = () => {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-red-50 via-white to-red-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <title>404 | Page Not Found</title>

      <div
        className="
          relative w-full 
          max-w-md sm:max-w-lg lg:max-w-xl 
          bg-white rounded-3xl shadow-2xl 
          p-6 sm:p-8 lg:p-10 
          text-center overflow-hidden
        "
      >

        {/* Decorative Circles */}
        <div className="absolute -top-20 -right-20 w-40 sm:w-48 h-40 sm:h-48 bg-red-100 rounded-full opacity-40"></div>
        <div className="absolute -bottom-20 -left-20 w-40 sm:w-48 h-40 sm:h-48 bg-red-200 rounded-full opacity-30"></div>

        {/* Icon */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <Droplet className="w-14 h-14 sm:w-20 sm:h-20 text-red-600 animate-pulse" />
        </div>

        {/* 404 */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-red-600 mb-3">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed px-2 sm:px-4">
          The page you’re looking for might have been moved or removed.
          But hope is never lost — lives still need saving ❤️
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            to="/"
            className="btn w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="btn w-full sm:w-auto btn-outline border-red-500 text-red-600 hover:bg-red-50 rounded-full px-6"
          >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Try Again
          </button>
        </div>

        {/* Footer */}
        <p className="text-[10px] sm:text-xs text-gray-400 mt-6 px-4">
          Even when a page is missing, hope never is 🩸
        </p>
      </div>
    </div>
  )
}

export default Error
