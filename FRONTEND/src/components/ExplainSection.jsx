function ExplainSection() {
  return (
    <>
      <section className="p-5">
        <h1 className="text-3xl text-center">Our Services include</h1>
        <div className="lg:flex-row">
          <div className="flex justify-between gap-5 p-1 mt-2">
            <div className="w-1/2">
              <img
                className="w-full"
                src="/images/data-analytics.jpg"
                alt="test test"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-2xl">Detailed Analytics</h3>
              <p>
                Stay on top of your links' performance and get insights into the
                clicks you earn and people you reach.
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-5 p-1 mt-2">
            <div className="w-1/2">
              <img
                className="w-full"
                src="/images/profile.png"
                alt="test test"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-2xl">Fully Branded Domains</h3>
              <p>
                Customize every part of your links with branded domains — say
                goodbye to default link shortening!
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-5 p-1 mt-2">
            <div className="w-1/2">
              <img
                className="w-full"
                src="/images/feature-3.webp"
                alt="test test"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-2xl">Bulk Short URLs</h3>
              <p>
                Scale your communications with our API, and create thousands of
                unique short links in the blink of an eye.
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-5 p-1 mt-2">
            <div className="w-1/2">
              <img
                className="w-full"
                src="/images/feature-4.webp"
                alt="test test"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-2xl">Link Management</h3>
              <p>
                Take full control of your links: search, edit, and manage
                thousands at a time from a convenient dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full bg-[#031f39] text-white">
        <div>
          <img src="/images/random.jpg" alt="someone using a tablet" />
        </div>
        <div className="w-full text-center p-5 h-100">
          <h3 className="text-2xl font-bold">
            Link Shortening Done Quick and Easy
          </h3>
          <p>
            Our URL shortener is not only among the first-ever link shorteners
            on the Internet — it's the best out there. Shorten links for social
            media, blogs, SMS, emails, ads, and almost anything both off- and
            online. Wave goodbye to long, clunky links and give your audiences
            the experiences they deserve!
          </p>
          <div className="w-full h-1/3 flex-col flex justify-around mt-3">
            <button className="bg-white text-black w-full h-1/3 rounded-lg">
              Shorten a Link
            </button>
            <button className="bg-[#0f62af] text-white w-full h-1/3 rounded-lg">
              Contact us
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExplainSection;
