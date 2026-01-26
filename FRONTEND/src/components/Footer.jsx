function Footer() {
  return (
    <footer className="h-1/4 w-full  text-center text-white text-lg p-5 bg-sky-600">
      <div className="flex items-center justify-around">
        <div>
          <h3>Legal</h3>
          <div>
            <a href="/terms" className="hover:underline">
              Terms of Service
            </a>
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
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
      </div>
      <p>© 2026 Url Shortener. All rights reserved.</p>
      <p>made with love by guardianprime</p>
      <div className="h-1/4 w-full">
        <ul className="h-full w-full  flex justify-center gap-4 mt-2 bg-black">
          <li>
            <a href="https://github.com/guardianprime">f</a>
          </li>
          <li>
            <a href="https://x.com/guardianprime">x</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/guardianprime">ln</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
