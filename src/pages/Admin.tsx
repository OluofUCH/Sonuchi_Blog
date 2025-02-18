
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PostList from "@/components/admin/PostList";
import PostForm from "@/components/admin/PostForm";

interface PostForm {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
}

interface Post {
  id: string;
  title: string;
  category: string;
  created_at: string;
}

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [formData, setFormData] = useState<PostForm>({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    image: "",
    readTime: "",
  });

  useEffect(() => {
    checkUser();
    fetchPosts();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
      }
    } catch (error) {
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, category, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post deleted successfully!",
      });

      setPosts(posts.filter(post => post.id !== id));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase.from("posts").insert({
        title: formData.title,
        category: formData.category,
        excerpt: formData.excerpt,
        content: formData.content,
        image: formData.image,
        read_time: formData.readTime,
        author: user.email,
        user_id: user.id,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post has been created successfully!",
      });

      setFormData({
        title: "",
        category: "",
        excerpt: "",
        content: "",
        image: "",
        readTime: "",
      });

      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-serif text-3xl font-semibold">Create New Post</h1>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/auth");
              }}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Logout
            </button>
          </div>

          <PostList posts={posts} onDelete={handleDelete} />
          <PostForm
            formData={formData}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
