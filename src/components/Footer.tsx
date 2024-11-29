import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <Link to="/privacy" className="hover:text-gray-900">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-gray-900">
            Terms of Service
          </Link>
          <a 
            href="mailto:support@mereka.app" 
            className="hover:text-gray-900"
          >
            Contact Us
          </a>
        </div>
        <div className="mt-2 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Mereka. All rights reserved.
        </div>
      </div>
    </footer>
  );
}