function UrlForm() {
  return (
    <div className="border-2 border-violet-900 h-full p-2.5">
      <form action="/shorten" method="POST" id="shortenForm">
        <label htmlFor="url">Enter URL:</label>
        <input type="text" id="url" name="url" required />
        <button type="submit">Shorten</button>
      </form>
    </div>
  );
}

export default UrlForm;
