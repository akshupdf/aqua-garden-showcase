"use client";

import { useState, useEffect } from "react";
import { supabase, supabaseAdmin, createBlogImagesBucket } from "@/lib/supabase";
import { testSupabaseConnection } from "@/lib/supabase-test";
import RichBlogEditor from "./RichBlogEditor";
import { v4 as uuidv4 } from 'uuid';

// Define types
type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ContentBlock[] | null;
  cover_image: string;
  category: string;
  published_at: string;
  is_published: boolean;
};

interface ContentBlock {
  id: string;
  type: 'heading' | 'text' | 'image' | 'list';
  content: string;
  level?: number;
  ordered?: boolean;
  items?: string[];
}

type Category = {
  id: string;
  name: string;
};

export default function AdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    is_is_published: false,
    cover_image: "",
  });

  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);

  // Editing state
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [newCategory, setNewCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    testSupabaseConnection();
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use admin client to see all blogs including unpublished ones
      const { data, error } = await supabaseAdmin
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (err: unknown) {
      console.error("Fetch blogs error:", err);
      setError(`Failed to load blogs: err instanceof Error ? err.message : String(err)`);
    } finally {
      setLoading(false);
    }
  };

  const refreshBlogs = () => {
    fetchBlogs();
    setSuccess("Blogs refreshed!");
    setTimeout(() => setSuccess(null), 2000);
  };

  const fetchCategories = async () => {
    // Use predefined categories as the blog_categories table doesn't exist yet
    const predefinedCategories = [
      { id: "basics", name: "Hydroponics Basics" },
      { id: "education", name: "Education & Learning" },
      { id: "systems", name: "System Guides" },
      { id: "maintenance", name: "Maintenance Tips" },
      { id: "troubleshooting", name: "Problem Solving" },
      { id: "urban", name: "Urban Farming" },
    ];
    setCategories(predefinedCategories);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `cover-${Date.now()}.${fileExt}`;

      // Check if bucket exists, create if not
      try {
        const { data: buckets, error: bucketError } = await supabaseAdmin.storage.listBuckets();
        const bucketExists = buckets?.some(bucket => bucket.name === 'blog-images');

        if (!bucketExists) {
          console.log('Creating blog-images bucket...');
          await createBlogImagesBucket();
        }
      } catch (err) {
        console.log('Bucket check failed, will try to upload anyway:', err);
      }

      // Upload to Supabase Storage using admin client
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('blog-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData } = supabaseAdmin.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      setFormData(prev => ({
        ...prev,
        cover_image: publicUrlData.publicUrl
      }));
    } catch (err: unknown) {
      console.error('Image upload error:', err);
      const errorMessage = err instanceof Error ? err.message : String(err);

      if (errorMessage.includes('Bucket not found')) {
        console.error('The blog-images bucket does not exist. Please create it first.');
        setFormData(prev => ({
          ...prev,
          cover_image: '',
        }));
      } else {
        // Fallback to placeholder image
        setFormData(prev => ({
          ...prev,
          cover_image: `https://images.unsplash.com/photo-1584133025760-a1ef8d50270b?w=800&h=400&fit=crop`
        }));
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim() || !formData.slug.trim() || !formData.excerpt.trim() || !formData.category) {
      setError("Please fill in all required fields");
      return;
    }

    // Generate excerpt from content blocks if not provided
    let finalExcerpt = formData.excerpt;
    if (!finalExcerpt && contentBlocks.length > 0) {
      const textBlocks = contentBlocks
        .filter(block => block.type === 'text')
        .map(block => block.content)
        .join(' ')
        .substring(0, 200);
      finalExcerpt = textBlocks || formData.excerpt;
    }

    try {
      // Prepare blog data
      const blogData = {
        ...formData,
        excerpt: finalExcerpt,
        content: contentBlocks.length > 0 ? contentBlocks : null,
        published_at: formData.is_published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      };

      let result;

      if (isEditing && editingBlogId) {
        // Update existing blog using admin client
        const { data, error } = await supabaseAdmin
          .from("blogs")
          .update(blogData)
          .eq("id", editingBlogId)
          .select();

        if (error) throw error;

        // Update local state
        setBlogs(prev => prev.map(blog =>
          blog.id === editingBlogId ? { ...blog, ...blogData } : blog
        ));

        setSuccess("Blog post updated successfully!");
      } else {
        // Create new blog using admin client
        const { data, error } = await supabaseAdmin
          .from("blogs")
          .insert([blogData])
          .select();

        if (error) throw error;

        setSuccess("Blog post created successfully!");
      }

      // Reset form
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        category: "",
        is_published: false,
        cover_image: "",
      });
      setContentBlocks([]);
      setIsEditing(false);
      setEditingBlogId(null);

      fetchBlogs();
      setError(null);
    } catch (err: unknown) {
      console.error("Submit error:", err);
      setError(`Failed to ${isEditing ? 'update' : 'create'} blog: err instanceof Error ? err.message : String(err)`);
      setSuccess(null);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    // For now, just show a message that the category would be added
    alert(`Category "${newCategory}" would be added to the system. This feature requires database setup.`);
    setNewCategory("");
  };

  const togglePublish = async (id: string, published: boolean) => {
    try {
      const { data, error } = await supabaseAdmin
        .from("blogs")
        .update({
          is_published: published,
          published_at: published ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select();

      if (error) throw error;

      // Update local state immediately
      setBlogs(prev => prev.map(blog =>
        blog.id === id ? { ...blog, is_published: published, published_at: data[0]?.published_at } : blog
      ));

      setSuccess(`Blog ${published ? 'published' : 'unpublished'} successfully!`);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      console.error("Toggle publish error:", err);
      setError(`Failed to ${published ? 'publish' : 'unpublish'} blog: err instanceof Error ? err.message : String(err)`);
    }
  };

  const deleteBlog = async (id: string) => {
    const blogTitle = blogs.find(b => b.id === id)?.title || 'blog';

    if (!confirm(`Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`)) return;

    try {
      const { error } = await supabaseAdmin
        .from("blogs")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Update local state immediately
      setBlogs(prev => prev.filter(blog => blog.id !== id));

      setSuccess(`Blog deleted successfully!`);
    } catch (err: unknown) {
      console.error("Delete error:", err);
      setError(`Failed to delete blog: err instanceof Error ? err.message : String(err)`);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  const editBlog = (blog: Blog) => {
    // Convert content to blocks if it's not already
    let blocks = blog.content;
    if (!Array.isArray(blocks) && typeof blocks === 'string') {
      // Convert old format to new block format
      blocks = [{
        id: uuidv4(),
        type: 'text',
        content: blocks
      }];
    } else if (!blocks) {
      blocks = [];
    }

    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || '',
      category: blog.category,
      is_published: blog.is_published,
      cover_image: blog.cover_image || '',
    });
    setContentBlocks(blocks);
    setIsEditing(true);
    setEditingBlogId(blog.id);
    setSuccess(null);
    setError(null);
  };

  const cancelEdit = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      category: "",
      is_published: false,
      cover_image: "",
    });
    setContentBlocks([]);
    setIsEditing(false);
    setEditingBlogId(null);
    setSuccess(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">Blog Admin Panel</h1>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-start">
              <h3 className="text-red-800 font-semibold mb-2">Error</h3>
              <button onClick={clearMessages} className="text-red-600 hover:text-red-800">
                ✕
              </button>
            </div>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-start">
              <h3 className="text-green-800 font-semibold mb-2">Success</h3>
              <button onClick={clearMessages} className="text-green-600 hover:text-green-800">
                ✕
              </button>
            </div>
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        {/* Create Blog Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Blog Post</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, title: e.target.value, slug: generateSlug(e.target.value) }));
                }}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="blog-url-slug"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt *
              </label>
              <textarea
                required
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Brief description of the blog post"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Publish immediately</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
              {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
              {formData.cover_image && (
                <div className="mt-2">
                  <img
                    src={formData.cover_image}
                    alt="Cover preview"
                    className="w-32 h-20 object-cover rounded"
                  />
                </div>
              )}
            </div>

            {/* Content Blocks */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Content Blocks</h3>
              <RichBlogEditor
                onContentChange={setContentBlocks}
                initialContent={contentBlocks}
              />
            </div>

            <button
              type="submit"
              className={`px-6 py-2 rounded-lg transition ${isEditing ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              {isEditing ? 'Update Blog Post' : 'Create Blog Post'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* Add Category */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>

          <div className="flex gap-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="New category name"
            />
            <button
              onClick={handleAddCategory}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Add Category
            </button>
          </div>
        </div>

        {/* Existing Blogs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Existing Blog Posts</h2>
            <button
              onClick={refreshBlogs}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition flex items-center gap-2"
            >
              ↻ Refresh
            </button>
          </div>

          {loading ? (
            <p>Loading blogs...</p>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div key={blog.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{blog.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{blog.excerpt}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {blog.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${blog.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {blog.is_published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editBlog(blog)}
                        className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => togglePublish(blog.id, !blog.is_published)}
                        className={`text-sm px-3 py-1 rounded ${blog.is_published ? 'bg-yellow-100 hover:bg-yellow-200' : 'bg-green-100 hover:bg-green-200'}`}
                      >
                        {blog.is_published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => deleteBlog(blog.id)}
                        className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}