const Navbar = () => {
  return (
    <header className="flex border-amber-600 border-2 justify-between">
      <div>logo image</div>
      <nav className="w-2/3 flex justify-between ">
        <ul className="flex justify-between w-2/3">
          <li>
            <a href="">about us</a>
          </li>
          <li>
            <a href="">services</a>
          </li>
          <li>
            <a href="/shorten/urls">my urls</a>
          </li>
        </ul>
        <button className="w-20 border-2 border-pink-800">sign in</button>
      </nav>
    </header>
  );
};

export default Navbar;
