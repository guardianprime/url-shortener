function ExplainSection() {
  return (
    <>
      <section className="p-5 lg:px-20 lg:py-15">
        <h1 className="text-3xl text-center">Our Services include</h1>
        <div className="lg:flex-row lg:flex justify-between">
          <div className="flex justify-between gap-5 p-1 mt-2 lg:w-50 lg:flex-col-reverse">
            <div className="w-1/2 lg:w-full">
              <img
                className="w-full"
                src="/images/data-analytics.jpg"
                alt="test test"
              />
            </div>
            <div className="w-1/2 lg:w-full">
              <div>
                <h3 className="text-2xl">Detailed Analytics</h3>
              </div>
              <div>
                <p>
                  Stay on top of your links' performance and get insights into
                  the clicks you earn and people you reach.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-5 p-1 mt-2 lg:w-50 lg:flex-col-reverse">
            <div className="w-1/2 lg:w-full">
              <img
                className="w-full"
                src="/images/profile.png"
                alt="test test"
              />
            </div>
            <div className="w-1/2 lg:w-full">
              <div>
                <h3 className="text-2xl">Fully Branded Domains</h3>
              </div>
              <div>
                <p>
                  Customize every part of your links with branded domains — say
                  goodbye to default link shortening!
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-5 p-1 mt-2 lg:w-50 lg:flex-col-reverse">
            <div className="w-1/2 lg:w-full">
              <img
                className="w-full"
                src="/images/feature-3.webp"
                alt="test test"
              />
            </div>
            <div className="w-1/2 lg:w-full">
              <div>
                <h3 className="text-2xl">Bulk Short URLs</h3>
              </div>
              <div>
                <p>
                  Scale your communications with our API, and create thousands
                  of unique short links in the blink of an eye.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-5 p-1 mt-2 lg:w-50 lg:flex-col-reverse">
            <div className="w-1/2 lg:w-full">
              <img
                className="w-full"
                src="/images/feature-4.webp"
                alt="test test"
              />
            </div>
            <div className="w-1/2 lg:w-full">
              <div>
                <h3 className="text-2xl">Link Management</h3>
              </div>
              <div>
                <p>
                  Take full control of your links: search, edit, and manage
                  thousands at a time from a convenient dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full bg-[#031f39] text-white lg:flex lg:h-110 lg:justify-between">
        <div className="lg:w-1/2 lg:h-full">
          <img
            src="/images/random.jpg"
            alt="someone using a tablet"
            className="lg:size-full"
            styles={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="w-full  p-5 h-100 lg:w-1/2 lg:p-20 ">
          <h3 className="text-2xl font-bold text-center">
            Link Shortening Done Quick and Easy
          </h3>
          <p className="mt-3">
            Our URL shortener is not only among the first-ever link shorteners
            on the Internet — it's the best out there.
          </p>
          <p>
            Shorten links for social media, blogs, SMS, emails, ads, and almost
            anything both off- and online.
          </p>
          <p>
            Wave goodbye to long, clunky links and give your audiences the
            experiences they deserve!
          </p>
          <div className="w-full h-1/3 flex-col flex justify-around mt-3 lg:flex-row lg:block lg:w-1/2">
            <button className="bg-white text-black w-full h-1/3 rounded-lg lg:w-max lg:h-10 lg:p-2 lg:rounded-sm">
              Shorten a Link
            </button>
            <button className="bg-[#0f62af] text-white w-full h-1/3 rounded-lg lg:w-max lg:h-10 lg:p-2 lg:rounded-sm lg:ml-4">
              Contact us
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExplainSection;
