function Footer() {
  function handleTest() {
    fetch("/me", { credentials: "include" })
      .then((res) => res.json())
      .then(console.log);
  }

  return (
    <footer>
      copyright 2025
      <button className="border-amber-50 border-2" onClick={() => handleTest()}>
        test
      </button>
    </footer>
  );
}

export default Footer;
