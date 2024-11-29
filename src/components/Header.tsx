import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Settings, LogOut, BarChart2, Users } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <img
                src="https://cdn.prod.website-files.com/64eda991d8d82729ed0120e8/64eda991d8d82729ed0127f0_Mereka.io%20Logo_HBlack.png"
                alt="Mereka.io"
                className="h-8"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-1 ${
                isActive('/dashboard') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/analytics" 
              className={`flex items-center space-x-1 ${
                isActive('/analytics') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              <BarChart2 className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
            <Link 
              to="/team" 
              className={`flex items-center space-x-1 ${
                isActive('/team') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Team</span>
            </Link>
            <Link 
              to="/settings" 
              className={`flex items-center space-x-1 ${
                isActive('/settings') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/dashboard"
                className={`block px-3 py-2 text-base font-medium ${
                  isActive('/dashboard') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/analytics"
                className={`block px-3 py-2 text-base font-medium ${
                  isActive('/analytics') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Analytics
              </Link>
              <Link
                to="/team"
                className={`block px-3 py-2 text-base font-medium ${
                  isActive('/team') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Team
              </Link>
              <Link
                to="/settings"
                className={`block px-3 py-2 text-base font-medium ${
                  isActive('/settings') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Settings
              </Link>
              <button className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};