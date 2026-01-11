"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (!error) {
      setArticle(data);
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
