import React from 'react';
import { Link } from 'react-router-dom';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="prose prose-indigo max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Name and contact information</li>
                <li>Professional details and company information</li>
                <li>Profile pictures and other media you upload</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use the collected information for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Creating and managing your digital business card</li>
                <li>Providing analytics and insights</li>
                <li>Improving our services</li>
                <li>Communication about updates and features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your personal information. 
                However, no method of transmission over the Internet is 100% secure, and we cannot 
                guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Third-Party Services</h2>
              <p className="text-gray-600">
                Our service integrates with third-party services for functionality like analytics 
                and data storage. These services have their own privacy policies that govern their 
                use of your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
              <p className="text-gray-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
              </ul>
            </section>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                For questions about this privacy policy, please contact us at{' '}
                <a href="mailto:privacy@mereka.app" className="text-indigo-600 hover:text-indigo-500">
                  privacy@mereka.app
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}