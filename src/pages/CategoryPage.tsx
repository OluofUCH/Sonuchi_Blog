
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const CategoryPage = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, [category]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl font-semibold mb-8 text-center">{category}</h1>
        
        {loading ? (
          <div className="flex items-center justify-center">Loading...</div>
        ) : posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard
                key={post.id}
                id={post.id}
                image={post.image}
                category={post.category}
                title={post.title}
                excerpt={post.excerpt}
                date={new Date(post.created_at).toLocaleDateString()}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No posts found in this category.</p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
