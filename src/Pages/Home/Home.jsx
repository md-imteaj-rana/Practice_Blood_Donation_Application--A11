import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Home = () => {

  const handleContact = (e) => {
    e.preventDefault()
    Swal.fire({
                title: "Thank you for reaching to us.",
                icon: "success",
                draggable: true
                });
                e.target.reset()
                
  }
  return (
    <div className="w-full">
      <title>Home</title>

      {/* ================= Banner Section ================= */}
      <section className="bg-linear-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Donate Blood, <br />
              <span className="text-red-200">Save Lives</span>
            </h1>
            <p className="mt-5 text-lg text-red-100">
              Blood Connect is a platform that connects blood donors with those
              in urgent need. One donation can save up to three lives.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/Register"
                className="px-6 py-3 bg-white text-red-600 font-semibold rounded-md hover:bg-gray-100 transition"
              >
                Join as a Donor
              </Link>

              <Link
                to="/SearchRequest"
                className="px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-red-600 transition"
              >
                Search Donors
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="hidden md:block">
            <img
              src="/public/Blood-donation-logo-vector.jpg"
              alt="Blood Donation"
              className="w-full max-w-md mx-auto rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* ================= Featured Section ================= */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Why Choose Blood Connect?
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              We aim to make blood donation faster, safer, and more accessible
              for everyone.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition">
              <div className="w-14 h-14 mx-auto flex items-center justify-center bg-red-100 rounded-full text-red-600 text-2xl font-bold">
                🩸
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                Easy Blood Requests
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Create blood donation requests in minutes and reach donors
                quickly.
              </p>
            </div>

            {/* Feature Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition">
              <div className="w-14 h-14 mx-auto flex items-center justify-center bg-red-100 rounded-full text-red-600 text-2xl font-bold">
                👥
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                Verified Donors
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Find verified donors by blood group and location for urgent
                needs.
              </p>
            </div>

            {/* Feature Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition">
              <div className="w-14 h-14 mx-auto flex items-center justify-center bg-red-100 rounded-full text-red-600 text-2xl font-bold">
                ❤️
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                Save Lives Together
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Your contribution can help patients in critical situations and
                emergencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Contact Us Section ================= */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Contact Us
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Have questions about blood donation or need urgent help?  
              Reach out to us — we’re always here to support you.
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Get in Touch
              </h3>

              <p className="text-gray-600 mb-6">
                You can contact us directly through phone or by submitting the form.
                For emergency blood requests, calling is recommended.
              </p>

              <div className="space-y-4 text-gray-700">
                <p>
                  <span className="font-semibold text-red-600">📞 Phone:</span>{" "}
                  +880 1234-567890
                </p>
                <p>
                  <span className="font-semibold text-red-600">📧 Email:</span>{" "}
                  support@bloodconnect.com
                </p>
                <p>
                  <span className="font-semibold text-red-600">📍 Address:</span>{" "}
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Send Us a Message
              </h3>

              <form onSubmit={handleContact} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Write your message"
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
