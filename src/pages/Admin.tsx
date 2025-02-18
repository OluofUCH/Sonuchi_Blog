
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PostForm {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
}

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Career">Career</option>
                <option value="Tutorials">Tutorials</option>
              </select>
            </div>

            <div>
              <label htmlFor="readTime" className="block mb-2 text-sm font-medium text-gray-700">
                Read Time
              </label>
              <input
                type="text"
                id="readTime"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                placeholder="e.g., 5 min read"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block mb-2 text-sm font-medium text-gray-700">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={10}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
