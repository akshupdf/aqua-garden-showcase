"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const CATEGORIES = [
  "basics",
  "education",
  "systems",
  "maintenance",
  "troubleshooting",
  "urban",
];

export default function WriteArticlePage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("basics");
  const [publishing, setPublishing] = useState(false);

  const generateSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(generateSlug(value));
  };

  const saveArticle = async (publish = false) => {
    setPublishing(true);

    const { error } = await supabase.from("blogs").insert([
      {
        title,
        slug,
        excerpt,
        content,
        category,
        is_published: publish,
        published_at: publish ? new Date() : null,
      },
    ]);

    setPublishing(false);

    if (!error) {
      alert(publish ? "Article published" : "Draft saved");
    } else {
      alert(error.message);
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        {/* HEADER */}
        <div>
          <h1
            className="text-4xl font-bold"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Write Article
          </h1>
          <p className="text-muted-foreground mt-2">
            Create educational content for hydroponics growers
          </p>
        </div>

        {/* TITLE */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 text-lg"
            placeholder="Understanding NFT Systems for Home Growers"
          />
        </div>

        {/* SLUG */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-xl border px-4 py-2 text-sm text-muted-foreground"
          />
        </div>

        {/* META */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border px-4 py-2 mt-2"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* EXCERPT */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Short summary shown in article cards..."
          />
        </div>

        {/* CONTENT */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Content (Markdown)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            className="w-full rounded-xl border px-4 py-3 font-mono text-sm"
            placeholder="## Introduction..."
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 pt-6">
          <Button
            variant="outline"
            disabled={publishing}
            onClick={() => saveArticle(false)}
          >
            Save Draft
          </Button>
          <Button disabled={publishing} onClick={() => saveArticle(true)}>
            Publish
          </Button>
        </div>
      </div>
    </section>
  );
}
