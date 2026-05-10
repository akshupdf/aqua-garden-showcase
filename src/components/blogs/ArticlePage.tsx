"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    setError(null);

    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) {
        console.error("Supabase error:", error);
        setError(`Failed to load article: ${error.message}`);
      } else {
        setArticle(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred while loading the article");
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-muted-foreground">
        Loading article...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 px-6">
        <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Article</h3>
          <p className="text-red-600 text-sm">{error}</p>
          <p className="text-red-600 text-xs mt-2">
            Check the browser console for more details and verify your Supabase configuration.
          </p>
        </div>
      </div>
    );
  }

  if (!article) {
    return <div className="py-24 text-center">Article not found</div>;
  }

  return (
    <article className="max-w-3xl mx-auto py-24 px-6">
      <h1
        className="text-4xl md:text-5xl font-bold mb-4"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {article.title}
      </h1>

      <p className="text-sm text-muted-foreground mb-8">
        {article.category} ·{" "}
        {new Date(article.published_at).toLocaleDateString()}
      </p>

      {article.cover_image && (
        <img
          src={article.cover_image}
          alt={article.title}
          className="rounded-2xl mb-10"
        />
      )}

      <div className="prose prose-neutral max-w-none">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </article>
  );
}
