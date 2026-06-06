"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, Link } from "react-router-dom";
import { testSupabaseConnection } from "@/lib/supabase-test";
import BlogContentRenderer from "./BlogContentRenderer";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  cover_image: string;
  category: string;
  published_at: string;
}

export default function ArticleContent() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    testSupabaseConnection();
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    if (!slug) return;

    setLoading(true);
    setError(null);
    setNotFound(false);

    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setNotFound(true);
          setError('Article not found');
        } else {
          setError(`Failed to load article: ${error.message}`);
        }
        return;
      }

      if (!data) {
        setNotFound(true);
        setError('Article not found');
        return;
      }

      setBlog(data);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred while loading the article");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryName = (categoryId: string) => {
    const categories: { [key: string]: string } = {
      basics: "Hydroponics Basics",
      education: "Education & Learning",
      systems: "System Guides",
      maintenance: "Maintenance Tips",
      troubleshooting: "Problem Solving",
      urban: "Urban Farming",
    };
    return categories[categoryId] || categoryId;
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      {/* Loading State */}
      {loading && (
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-6 w-5/6"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && !notFound && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-4">Error</h1>
          <p className="text-red-600 mb-6">{error}</p>
          <Link
            to="/blog"
            className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Back to Articles
          </Link>
        </div>
      )}

      {/* Not Found State */}
      {notFound && !loading && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-yellow-800 mb-4">Article Not Found</h1>
          <p className="text-yellow-700 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/blog"
            className="inline-block bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition"
          >
            Back to Articles
          </Link>
        </div>
      )}

      {/* Content */}
      {!loading && !error && blog && (
        <>
          {/* Cover Image */}
          {blog.cover_image && (
            <div className="mb-8">
              <img
                src={blog.cover_image}
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Article Header */}
          <article className="prose prose-lg max-w-none">
            <header className="mb-8">
              {/* Category */}
              <div className="mb-4">
                <Link
                  to={`/blog?category=${blog.category}`}
                  className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition"
                >
                  {getCategoryName(blog.category)}
                </Link>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {blog.title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-gray-600 text-sm mb-6">
                <span>Published on {formatDate(blog.published_at)}</span>
              </div>

              {/* Excerpt */}
              {blog.excerpt && (
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  {blog.excerpt}
                </p>
              )}
            </header>

            {/* Article Content */}
            <section className="prose prose-lg max-w-none">
              <BlogContentRenderer content={blog.content} />
            </section>

            {/* Related Articles or Back to Blog */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
              >
                ← Back to Articles
              </Link>
            </div>
          </article>
        </>
      )}
    </div>
  );
}