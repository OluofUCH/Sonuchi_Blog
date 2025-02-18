
interface PostFormData {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
}

interface PostFormProps {
  formData: PostFormData;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PostForm = ({ formData, loading, onChange, onSubmit }: PostFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
  );
};

export default PostForm;
