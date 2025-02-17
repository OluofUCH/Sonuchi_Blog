
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">About DevBlog</h3>
            <p className="text-sm text-gray-600">
              A modern blog platform for developers to share their knowledge and experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              </li>
              <li>
                <a href="/admin" className="text-gray-600 hover:text-gray-900">Admin</a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-gray-900">About Us</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#technology" className="text-gray-600 hover:text-gray-900">Technology</a>
              </li>
              <li>
                <a href="#design" className="text-gray-600 hover:text-gray-900">Design</a>
              </li>
              <li>
                <a href="#development" className="text-gray-600 hover:text-gray-900">Development</a>
              </li>
              <li>
                <a href="#tutorials" className="text-gray-600 hover:text-gray-900">Tutorials</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#twitter" className="text-gray-600 hover:text-gray-900">Twitter</a>
              </li>
              <li>
                <a href="#github" className="text-gray-600 hover:text-gray-900">GitHub</a>
              </li>
              <li>
                <a href="#linkedin" className="text-gray-600 hover:text-gray-900">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} DevBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
