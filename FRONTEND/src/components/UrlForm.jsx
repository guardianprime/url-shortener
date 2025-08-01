function UrlForm() {
  return (
    <div className="border-2 border-violet-900 h-full p-2.5">
      <form action="/shorten" method="POST" id="shortenForm">
        <label htmlFor="url" className="text-lg">
          Shorten your link
        </label>
        <input
          type="text"
          id="url"
          name="url"
          required
          className="block border-2 border-amber-500 rounded-sm w-full h-10 p-2 mt-2"
          placeholder="Enter a long link here"
        />
        <label htmlFor="alias" className="mt-4  text-lg">
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          <span>customize your link</span>
        </label>
        <input
          type="text"
          id="alias"
          name="alias"
          className="block border-2 border-amber-500 rounded-sm w-full h-10 p-2 mt-2"
          placeholder="Enter alias"
        />
        <button
          type="submit"
          className="border-2 border-amber-600 mt-7 p-2 rounded-sm block mx-auto"
        >
          Shorten URL
        </button>
      </form>
    </div>
  );
}

export default UrlForm;
