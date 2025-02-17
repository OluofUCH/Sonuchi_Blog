
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { name: "Home", href: "/" },
    { name: "Technology", href: "#technology" },
    { name: "Design", href: "#design" },
    { name: "Development", href: "#development" },
    { name: "Career", href: "#career" },
    { name: "Tutorials", href: "#tutorials" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="font-serif text-xl font-semibold">DevBlog</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex space-x-8">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile menu button */}
          <button
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <ul className="space-y-4 pb-4">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="block py-2 text-base font-medium text-gray-700 transition-colors hover:text-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
