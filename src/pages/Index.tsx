
import { useEffect } from "react";
import ArticleCard from "@/components/ArticleCard";
import Newsletter from "@/components/Newsletter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  // Simulate loading state for images
  useEffect(() => {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      img.style.opacity = "0";
      img.onload = () => {
        img.style.transition = "opacity 0.5s ease-in-out";
        img.style.opacity = "1";
      };
    });
  }, []);

  const featuredPost = {
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Technology",
    title: "The Future of Web Development",
    excerpt: "Explore the latest trends and innovations shaping the future of web development...",
    date: "Mar 15, 2024",
  };

  const recentPosts = [
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      category: "Design",
      title: "Principles of Modern UI Design",
      excerpt: "Learn the key principles that make modern user interfaces both beautiful and functional...",
      date: "Mar 14, 2024",
    },
    {
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      category: "Development",
      title: "Clean Code Practices",
      excerpt: "Discover the best practices for writing clean, maintainable code that scales...",
      date: "Mar 13, 2024",
    },
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      category: "Career",
      title: "Becoming a Better Developer",
      excerpt: "Tips and strategies to improve your skills and advance your development career...",
      date: "Mar 12, 2024",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="animate-fade-in rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900">
            Welcome to our blog
          </span>
          <h1 className="animate-fade-up font-serif text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Insights for the Modern Developer
          </h1>
          <p className="animate-fade-up mt-6 text-lg text-gray-600 [animation-delay:200ms]">
            Discover articles, guides, and stories from the world of development and design.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-8 font-serif text-2xl font-semibold">Featured Post</h2>
        <div className="animate-fade-up">
          <ArticleCard {...featuredPost} />
        </div>
      </section>

      {/* Recent Posts */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-8 font-serif text-2xl font-semibold">Recent Posts</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post, index) => (
            <div
              key={post.title}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ArticleCard {...post} />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      <Footer />
    </div>
  );
};

export default Index;
