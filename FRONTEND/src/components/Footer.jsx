function Footer() {
  return (
    <footer className="h-1/4 w-full text-white text-lg p-5 bg-sky-600 lg:flex justify-between">
      <div className="flex items-center justify-between lg:w-1/3">
        <div>
          <h3>Legal</h3>
          <div className="flex-col">
            <ul>
              <li>
                <a href="/terms" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Complaints
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Complaints
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="">
        <div className="h-1/4 w-full flex justify-start flex-col lg:w-1/3">
          <ul className="h-full w-1/2  flex justify-center gap-4 mt-2">
            <li className="w-full">
              <a href="https://github.com/guardianprime">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </li>
            <li className="w-full">
              <a href="https://x.com/guardianprime">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </li>
            <li className="w-full">
              <a href="https://linkedin.com/in/guardianprime">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
          <div className="w-1/2">
            <h1>SMALLURL</h1>
          </div>
        </div>

        <p>© 2026 Url Shortener. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
