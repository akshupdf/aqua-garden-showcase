"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
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

  useEffect(() => {
    fetchBlogs();
  }, [activeCategory, search]);

  const fetchBlogs = async () => {
    setLoading(true);

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

    if (!error && data) {
      setBlogs(data);
    }

    setLoading(false);
  };

  return (
    <section className="relative py-20 bg-background">
      <div className="container mx-auto px-6 grid md:grid-cols-[25%_75%] gap-12">
        {/* LEFT SIDEBAR */}
        <aside className="sticky top-24 space-y-6 h-fit">
          <input
            placeholder="Search articles..."
            className="w-full rounded-lg border px-4 py-2 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="space-y-2">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition
                  ${
                    activeCategory === cat.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
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

          {/* EMPTY STATE */}
          {!loading && blogs.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground">
              No articles found.
            </p>
          )}

          {/* BLOG CARDS */}
          {!loading &&
            blogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/articles/${blog.slug}`}
                className="group"
              >
                <article className="rounded-2xl border bg-background overflow-hidden transition hover:shadow-md">
                  {blog.cover_image && (
                    <img
                      src={blog.cover_image}
                      alt={blog.title}
                      className="h-48 w-full object-cover"
                    />
                  )}

                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {blog.category}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold group-hover:text-primary">
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
