function UrlForm() {
  return (
    <div>
      <form action="/shorten" method="POST" id="shortenForm">
        <label for="url">Enter URL:</label>
        <input type="text" id="url" name="url" required />
        <button type="submit">Shorten</button>
      </form>
    </div>
  );
}

export default UrlForm;
