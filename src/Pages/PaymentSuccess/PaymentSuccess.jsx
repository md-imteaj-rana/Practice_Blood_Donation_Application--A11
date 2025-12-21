import React, { useEffect } from 'react'
import { useSearchParams, Link } from 'react-router'
import useAxios from '../../hooks/useAxios'
import { CheckCircle, HeartHandshake } from 'lucide-react'

const PaymentSuccess = () => {

  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const axiosInstance = useAxios()

  useEffect(() => {
    if (sessionId) {
      axiosInstance
        .post(`/success-payment?session_id=${sessionId}`)
        .then(res => console.log(res.data))
        .catch(err => console.error(err))
    }
  }, [axiosInstance, sessionId])

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-red-50 via-white to-red-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <title>Payment Successful</title>

      <div className="
        relative w-full max-w-md sm:max-w-lg lg:max-w-xl 
        bg-white rounded-3xl shadow-2xl 
        p-6 sm:p-8 lg:p-10 
        text-center overflow-hidden
      ">

        {/* Decorative Circles */}
        <div className="absolute -top-20 -right-20 w-40 sm:w-48 h-40 sm:h-48 bg-red-100 rounded-full opacity-40"></div>
        <div className="absolute -bottom-20 -left-20 w-40 sm:w-48 h-40 sm:h-48 bg-red-200 rounded-full opacity-30"></div>

        {/* Icon */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 animate-bounce" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-3">
          Donation Successful 🎉
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed px-2 sm:px-4">
          Thank you for your generous contribution. Your donation supports blood donation campaigns and helps save lives across the community.
        </p>

        {/* Highlight Card */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 sm:p-5 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-red-600 font-semibold">
            <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-sm sm:text-base">You are now a lifesaver ❤️</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 px-2">
            Together, we ensure that no life is lost due to blood shortage.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            to="/"
            className="btn w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
          >
            Go to Home
          </Link>

          <Link
            to="/Dashboard"
            className="btn w-full sm:w-auto btn-outline border-red-500 text-red-600 hover:bg-red-50 rounded-full px-6"
          >
            View Dashboard
          </Link>
        </div>

        {/* Session ID */}
        {sessionId && (
          <p className="text-[10px] sm:text-xs text-gray-400 mt-6 break-all px-4">
            Payment reference: <span className="font-mono">{sessionId}</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default PaymentSuccess
