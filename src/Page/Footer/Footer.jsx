import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
        {/* Left part: Site name */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start space-y-1 md:space-y-2 md:w-1/3">
          <h1 className="text-2xl font-bold text-white">StudyHub</h1>
          <p className="text-sm mt-1 max-w-xs">Learn & Grow with Experts</p>
        </div>

        {/* Center part: Social Icons */}
        <div className="flex space-x-6 justify-center md:justify-center md:w-1/3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-600 transition"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 1 0-11.6 9.7v-6.9h-2.8v-2.8h2.8v-2.1c0-2.7 1.6-4.2 4-4.2 1.2 0 2.5.2 2.5.2v2.7h-1.3c-1.3 0-1.7.8-1.7 1.7v2h2.9l-.5 2.8h-2.4v6.9A10 10 0 0 0 22 12z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-blue-400 transition"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3.1.9A5.4 5.4 0 0 0 22.4.4a10.8 10.8 0 0 1-3.4 1.3 5.4 5.4 0 0 0-9.2 4.9A15.4 15.4 0 0 1 1.7 2.2a5.4 5.4 0 0 0 1.7 7.3A5.3 5.3 0 0 1 .9 9v.1a5.4 5.4 0 0 0 4.3 5.3 5.4 5.4 0 0 1-2.4.1 5.4 5.4 0 0 0 5 3.8A10.9 10.9 0 0 1 1 20.1 15.4 15.4 0 0 0 8.4 22c10 0 15.4-8.3 15.4-15.4v-.7A11 11 0 0 0 23 3z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-700 transition"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zm.02 4.4H2V21h3V7.9zM8.5 7.9h2.7v1.7h.04c.38-.7 1.3-1.4 2.7-1.4 2.9 0 3.4 1.9 3.4 4.4V21h-3v-6.9c0-1.7-.04-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8V21h-3V7.9z" />
            </svg>
          </a>
        </div>

        {/* Right part: Contact */}
        <div className="text-sm text-center md:text-right md:w-1/3 space-y-1">
          <p>
            Contact us:{" "}
            <a
              href="mailto:support@studyhub.com"
              className="text-blue-400 hover:underline"
            >
              support@studyhub.com
            </a>
          </p>
          <p>Phone: +880 1234 567890</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-6">
        &copy; {new Date().getFullYear()} StudyHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
