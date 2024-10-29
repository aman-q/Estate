import { useState, useEffect, useRef } from 'react';
import { Search, Upload, ChevronDown, Menu } from 'lucide-react';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }

    // Handle clicks outside of dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3">
              <img src="/logo.svg" className="h-10 w-10 transform transition hover:scale-105" alt="Logo" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                ZA Estate
              </span>
            </a>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg 
                          bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition-all duration-200 ease-in-out"
                placeholder="Search properties..."
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <a href="/uploadProperties/page" className="inline-flex items-center px-4 py-2 border border-transparent 
                                 text-sm font-medium rounded-lg text-white bg-blue-500 
                                 hover:bg-blue-600 focus:outline-none focus:ring-2 
                                 focus:ring-offset-2 focus:ring-blue-500 transition-colors
                                 duration-200 space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Property</span>
                </a>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="inline-flex items-center space-x-2 p-2 rounded-lg
                             hover:bg-gray-100 transition-colors duration-200"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    <img
                      className="h-8 w-8 rounded-full ring-2 ring-gray-200"
                      src="https://cdn-icons-png.flaticon.com/512/164/164600.png"
                      alt="Profile"
                    />
                    <ChevronDown 
                      className={`h-4 w-4 text-gray-600 transition-transform duration-200 
                                ${dropdownOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {dropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg 
                                ring-1 ring-black ring-opacity-5 py-1 z-50"
                    >
                      <a 
                        href="/NewAuth/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
                                 transition-colors duration-150"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </a>
                      <a 
                        href="/sign-out" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
                                 transition-colors duration-150"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Sign Out
                      </a>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <a href="/NewAuth/SignIn">
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 
                                 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 
                                 focus:ring-offset-2 focus:ring-blue-500 transition-colors 
                                 duration-200">
                  Login
                </button>
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 
                         hover:text-gray-500 hover:bg-gray-100 focus:outline-none 
                         focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="p-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg 
                            bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search properties..."
                />
              </div>
            </div>
            {isLoggedIn ? (
              <>
                <a 
                  href="/uploadProperties/page" 
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 
                           hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Upload Property
                </a>
                <a 
                  href="/NewAuth/profile" 
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 
                           hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </a>
                <a 
                  href="/sign-out" 
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 
                           hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Out
                </a>
              </>
            ) : (
              <a 
                href="/NewAuth/SignIn" 
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 
                         hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;