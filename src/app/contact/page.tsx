'use client';

import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-700">
              Financial Advisor Portal
            </Link>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Have questions about our financial advisor services? Get in touch with us and we'll be happy to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                <p className="text-gray-600 mb-6">
                  We're here to help with any questions you might have about our financial education portal. 
                  Fill out the form or use the contact details below to reach us.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Email</h3>
                      <p className="text-sm text-gray-600">phil@arthurbrowns.co.uk</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                      <p className="text-sm text-gray-600">Please email for phone details</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Financial Advisor Portal</h3>
              <p className="text-gray-300">
                Providing financial education and support for businesses and their employees.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p className="text-gray-300 mb-2">Phil Handley</p>
              <p className="text-gray-300">Email: phil@arthurbrowns.co.uk</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} Financial Advisor Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 