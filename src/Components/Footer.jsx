import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🩸</span>
            <h2 className="text-xl font-semibold text-white">BloodConnect</h2>
          </div>
          <p className="text-sm leading-relaxed">
            BloodConnect is a humanitarian platform connecting blood donors with
            people in need. Together, we save lives through compassion and
            technology.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-red-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/donation-requests"
                className="hover:text-red-500 transition"
              >
                Donation Requests
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-red-500 transition">
                Search Donors
              </Link>
            </li>
            <li>
              <Link to="/funding" className="hover:text-red-500 transition">
                Funding
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/contact" className="hover:text-red-500 transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-red-500 transition">
                About Us
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Dhaka, Bangladesh</li>
            <li>📞 +880 1234 567 89</li>
            <li>✉️ support@bloodconnect.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BloodConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
