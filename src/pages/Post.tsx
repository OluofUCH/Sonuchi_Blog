
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { Clock, Calendar, Heart, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Post {
  title: string;
  category: string;
  author: string;
  created_at: string;
  read_time: string;
  image: string;
  content: string;
}

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
      img.style.opacity = "0";
      img.onload = () => {
        img.style.transition = "opacity 0.5s ease-in-out";
        img.style.opacity = "1";
      };
    });
  }, [post]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
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

      <article className="flex-1 mx-auto max-w-4xl px-4 py-12">
        <header className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">•</span>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              {post.read_time}
            </div>
            <span className="text-sm text-gray-500">•</span>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              {new Date(post.created_at).toLocaleDateString()}
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

        <div className="mb-12 overflow-hidden rounded-xl">
          <img
            src={post.image}
            alt={post.title}
            className="h-[400px] w-full object-cover"
          />
        </div>

        <div 
          className="prose prose-lg mx-auto max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Post;
