import React from "react";

// --- SVG Icon Components for the Footer ---
const TwitterIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);
const InstagramIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"
      clipRule="evenodd"
    />
  </svg>
);
const LinkedinIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
      clipRule="evenodd"
    />
  </svg>
);
const FacebookIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M22 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 5.034 3.69 9.213 8.438 9.878v-6.988h-2.54v-2.89h2.54v-2.205c0-2.508 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.451h-1.26c-1.24 0-1.628.772-1.628 1.562v1.878h2.773l-.443 2.89h-2.33v6.988c4.747-.665 8.438-4.844 8.438-9.878z" />
  </svg>
);

// --- Footer Component ---
const Footer = () => {
  const footerLinks = {
    Product: [
      "Features",
      "Pricing",
      "Blog",
      "Supported Brokers",
      "Become a Partner",
    ],
    Company: ["Contact Us", "Careers", "Wall of Love ♥"],
    Legal: ["Privacy Policy", "Terms & Conditions"],
  };

  return (
    <footer className="bg-[#0f101b] text-gray-400">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Logo and Disclaimer */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white">Tradeverse</h2>
            <p className="mt-4 text-sm">
              Tools for futures, currency & options involves substantial risk &
              is not appropriate for everyone. Only risk capital should be used
              for trading. Testimonials appearing on this website may not be
              representative of other clients or customers and is not a
              guarantee of future performance or success.
            </p>
          </div>

          {/* Link Columns */}
          {Object.keys(footerLinks).map((category) => (
            <div key={category}>
              <h3 className="text-md font-semibold text-gray-200 tracking-wider uppercase">
                {category}
              </h3>
              <ul className="mt-4 space-y-4">
                {footerLinks[category].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 5: Social Links */}
          <div>
            <h3 className="text-md font-semibold text-gray-200 tracking-wider uppercase">
              Connect
            </h3>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <TwitterIcon />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <LinkedinIcon />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FacebookIcon />
              </a>
            </div>
            <a
              href="#"
              className="inline-block mt-6 text-sm text-gray-400 hover:text-white transition-colors duration-300"
            >
              Browse all 30+ integrations &raquo;
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} Tradeverse. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
