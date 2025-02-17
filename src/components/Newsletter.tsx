
const Newsletter = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-2xl bg-gray-50 p-8 shadow-sm">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
            Stay Updated
          </h2>
          <p className="mt-4 text-gray-600">
            Subscribe to our newsletter to get the latest articles and insights.
          </p>
        </div>
        <form className="mx-auto mt-8 max-w-xl">
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-gray-700 shadow-sm transition-colors duration-200 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-8 py-3 font-medium text-white transition-colors duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
