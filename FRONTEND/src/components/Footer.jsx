function Footer() {
  return (
    <footer className="h-40 flex flex-col items-center justify-around text-center text-white text-lg p-5">
      <p>© 2024 Url Shortener. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="/about" className="hover:underline">
          About
        </a>
        <a href="/terms" className="hover:underline">
          Terms of Service
        </a>
        <a href="/privacy" className="hover:underline">
          Privacy Policy
        </a>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
      </div>
      <div>
        <p>made with love by guardianprime</p>
        <div>
          <ul>
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
      </div>
    </footer>
  );
}

export default Footer;
