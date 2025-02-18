
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { useToast } from "@/components/ui/use-toast";

interface Post {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  created_at: string;
}

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    searchPosts();
  }, [query]);

  const searchPosts = async () => {
    try {
      const { data, error } = await supabase
        .rpc('search_posts', { search_query: query });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to search posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl font-semibold mb-8 text-center">
          Search Results for "{query}"
        </h1>
        
        {loading ? (
          <div className="flex items-center justify-center">Loading...</div>
        ) : posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard
                key={post.id}
                image={post.image}
                category={post.category}
                title={post.title}
                excerpt={post.excerpt}
                date={new Date(post.created_at).toLocaleDateString()}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No posts found matching your search.</p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
