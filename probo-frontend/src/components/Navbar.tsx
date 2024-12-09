import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [balance] = useState('₹4.8'); // This would typically come from a context or prop

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0">
            <img src="/probo-logo.svg" alt="Probo" className="h-6 w-auto" />
          </Link>

          <div className="hidden sm:flex sm:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link to="/portfolio" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Portfolio
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <span className="hidden lg:block text-sm text-gray-600">
              For 18 years and above only
            </span>
            <Link
              to="/download"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Download App
            </Link>
            <span className="text-gray-900 font-semibold">
              {balance}
            </span>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <img src="/language-icon.svg" alt="Language" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
