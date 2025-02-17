
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Newsletter from "@/components/Newsletter";
import { Clock, Calendar, Heart, Share2 } from "lucide-react";

const Post = () => {
  const { id } = useParams();

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

  // This is mock data - in a real app, you'd fetch this based on the post ID
  const post = {
    title: "The Future of Web Development",
    category: "Technology",
    author: "John Doe",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    content: `
      <p class="mb-4">
        The landscape of web development is constantly evolving, bringing new challenges and opportunities for developers around the world. As we look toward the future, several key trends are emerging that will shape how we build and interact with web applications.
      </p>
      
      <h2 class="mb-4 font-serif text-2xl font-semibold">The Rise of AI-Powered Development</h2>
      
      <p class="mb-4">
        Artificial Intelligence is revolutionizing how we approach web development. From automated testing to intelligent code completion, AI tools are becoming an integral part of the development workflow. These advancements are not just making developers more productive; they're fundamentally changing how we think about building applications.
      </p>
      
      <p class="mb-4">
        The integration of AI into development tools means that developers can focus more on solving complex problems and less on repetitive tasks. This shift is leading to more innovative solutions and better user experiences.
      </p>
      
      <h2 class="mb-4 font-serif text-2xl font-semibold">Web Assembly and the Future of Performance</h2>
      
      <p class="mb-4">
        Web Assembly (Wasm) is opening new possibilities for web applications, enabling near-native performance in the browser. This technology is particularly exciting for compute-intensive applications like video editing, 3D rendering, and complex simulations.
      </p>
      
      <p class="mb-4">
        As Web Assembly matures, we're seeing more traditional desktop applications moving to the web, creating new opportunities for cross-platform development and distribution.
      </p>
    `,
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <article className="mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">•</span>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
            <span className="text-sm text-gray-500">•</span>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              {post.date}
            </div>
          </div>
          
          <h1 className="mb-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          
          <div className="mb-8 flex items-center justify-center gap-4">
            <button className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200">
              <Heart className="h-4 w-4" />
              Like
            </button>
            <button className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200">
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12 overflow-hidden rounded-xl">
          <img
            src={post.image}
            alt={post.title}
            className="h-[400px] w-full object-cover"
          />
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg mx-auto max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Newsletter />
    </div>
  );
};

export default Post;
