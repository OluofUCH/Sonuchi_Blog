import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { Clock, Calendar, Heart, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast, useToast } from "@/components/ui/use-toast";

interface Post {
  title: string;
  category: string;
  author: string;
  created_at: string;
  read_time: string;
  image: string;
  content: string;
}
  const handleShare = async () => {
    
    try {
      await navigator.share({
        title: Post?.name,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback for browsers that don't support native sharing
      // Fallback for browsers that don't support native sharing
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Post link copied to clipboard"
      });
    }
  };
const Post = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  useEffect(() => {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      img.style.maxWidth = "100%"; // Ensure images don’t exceed container
      img.style.height = "80%"; // Maintain aspect ratio
      img.style.display = "block"; // Proper alignment
      img.style.margin = "0 auto"; // Center images

      img.style.opacity = "0";
      img.onload = () => {
        img.style.transition = "opacity 0.5s ease-in-out";
        img.style.opacity = "1";
      };
    });

    // Ensure tables and other elements are responsive
    const tables = document.querySelectorAll("table");
    tables.forEach((table) => {
      table.style.width = "100%";
      table.style.overflowX = "auto";
    });
  }, [post]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center">Post not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      <article className="flex-1 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="mb-6 sm:mb-8 text-center">
          {/* Category and Meta Information */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base">
            <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-900">
              {post.category}
            </span>
            <span className="hidden sm:inline text-gray-500">•</span>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="h-4 w-4" />
              {post.read_time}
            </div>
            <span className="hidden sm:inline text-gray-500">•</span>
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="h-4 w-4" />
              {new Date(post.created_at).toLocaleDateString()}
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight">
            {post.title}
          </h1>

          {/* Like & Share Buttons */}
          <div className="mb-6 sm:mb-8 flex flex-wrap justify-center gap-4">
            <button className="w-1/5 sm:w-auto flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-200">
              <Heart className="h-4 w-4" />
              Like
            </button>
            <button className="w-1/5 sm:w-auto flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-200" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-6 sm:mb-12 overflow-hidden rounded-xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full lg:w-1/3 h-auto sm:h-[400px] object-cover"
          />
        </div>

        {/* Post Content - Automatically Wraps */}
        <div 
          className="prose prose-lg text-left sm:prose-xl mx-auto max-w-none break-words text-gray-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Post;
