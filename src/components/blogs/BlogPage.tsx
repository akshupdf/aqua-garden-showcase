"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { testSupabaseConnection } from "@/lib/supabase-test";

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  cover_image: string;
  category: string;
  published_at: string;
};

const BLOG_CATEGORIES = [
  { id: "all", label: "All Articles" },
  { id: "basics", label: "Hydroponics Basics" },
  { id: "education", label: "Education & Learning" },
  { id: "systems", label: "System Guides" },
  { id: "maintenance", label: "Maintenance Tips" },
  { id: "troubleshooting", label: "Problem Solving" },
  { id: "urban", label: "Urban Farming" },
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    testSupabaseConnection(); // Test connection on component mount
    fetchBlogs();
  }, [activeCategory, search]);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (activeCategory !== "all") {
        query = query.eq("category", activeCategory);
      }

      if (search.trim()) {
        query = query.ilike("title", `%${search}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Supabase error:", error);
        setError(`Failed to load blogs: ${error.message}`);
      } else if (data) {
        // Filter out blogs with null or empty slugs
        const validBlogs = data.filter(blog => blog.slug && blog.slug.trim() !== '');
        setBlogs(validBlogs);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred while loading blogs");
    }

    setLoading(false);
  };

  return (
    <section className="relative py-8 sm:py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-[260px_1fr] gap-8 md:gap-12">
        {/* LEFT SIDEBAR */}
        <aside className="md:sticky md:top-24 space-y-4 md:space-y-6 h-fit">
          <input
            placeholder="Search articles..."
            className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-green-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 md:w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition whitespace-nowrap
                  ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/50 hover:bg-muted text-foreground"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* LOADING STATE */}
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-muted animate-pulse"
              />
            ))}

          {/* ERROR STATE */}
          {!loading && error && (
            <div className="col-span-full bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-red-800 font-semibold mb-2">Error Loading Blogs</h3>
              <p className="text-red-600 text-sm">{error}</p>
              <p className="text-red-600 text-xs mt-2">
                Check the browser console for more details and verify your Supabase configuration.
              </p>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && blogs.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground">
              No articles found.
            </p>
          )}

          {/* BLOG CARDS */}
          {!loading && !error &&
            blogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/articles/${blog.slug}`}
                className="group"
              >
                <article className="rounded-2xl border bg-background overflow-hidden transition hover:shadow-md h-[380px] flex flex-col">
                  {blog.cover_image && (
                    <img
                      src={blog.cover_image}
                      alt={blog.title}
                      className="h-48 w-full object-cover flex-shrink-0"
                    />
                  )}

                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {blog.category}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold group-hover:text-primary line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
