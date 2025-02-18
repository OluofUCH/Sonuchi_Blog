
import { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import Newsletter from "@/components/Newsletter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Post {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  created_at: string;
}

const Index = () => {
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;

      if (data && data.length > 0) {
        setFeaturedPost(data[0]);
        setRecentPosts(data.slice(1));
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

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
      {featuredPost && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="mb-8 font-serif text-2xl font-semibold">Featured Post</h2>
          <div className="animate-fade-up max-w-3xl mx-auto">
            <ArticleCard
              image={featuredPost.image}
              category={featuredPost.category}
              title={featuredPost.title}
              excerpt={featuredPost.excerpt}
              date={new Date(featuredPost.created_at).toLocaleDateString()}
              className="max-h-[500px]"
            />
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="mb-8 font-serif text-2xl font-semibold">Recent Posts</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post, index) => (
              <div
                key={post.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ArticleCard
                  image={post.image}
                  category={post.category}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={new Date(post.created_at).toLocaleDateString()}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <Newsletter />

      <Footer />
    </div>
  );
};

export default Index;
