import React from 'react';
import { Link } from 'react-router-dom';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          
          <div className="prose prose-indigo max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing or using Mereka's digital business card service, you agree to be bound 
                by these Terms of Service. If you disagree with any part of the terms, you may not 
                access the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. User Accounts</h2>
              <p className="text-gray-600 mb-4">
                When you create an account with us, you must provide accurate and complete information.
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Maintaining the security of your account</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Acceptable Use</h2>
              <p className="text-gray-600 mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Use the service for any illegal purposes</li>
                <li>Share inappropriate or offensive content</li>
                <li>Attempt to breach our security measures</li>
                <li>Infringe on others' intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Service Modifications</h2>
              <p className="text-gray-600">
                We reserve the right to modify or discontinue, temporarily or permanently, the service 
                with or without notice. We shall not be liable to you or any third party for any 
                modification, suspension, or discontinuance of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-600">
                To the maximum extent permitted by law, we shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages resulting from your use 
                of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Governing Law</h2>
              <p className="text-gray-600">
                These Terms shall be governed by and construed in accordance with the laws of the 
                jurisdiction in which we operate, without regard to its conflict of law provisions.
              </p>
            </section>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                For questions about these terms, please contact us at{' '}
                <a href="mailto:legal@mereka.app" className="text-indigo-600 hover:text-indigo-500">
                  legal@mereka.app
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