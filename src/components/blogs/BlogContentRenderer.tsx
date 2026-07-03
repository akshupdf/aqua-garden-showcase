"use client";

import { useEffect } from "react";

interface ContentBlock {
  id: string;
  type: 'heading' | 'text' | 'image' | 'list';
  content: string;
  level?: number;
  ordered?: boolean;
  items?: string[];
}

interface BlogContentRendererProps {
  content: ContentBlock[];
}

export default function BlogContentRenderer({ content }: BlogContentRendererProps) {
  // Handle content stored as string - parse it to array
  let contentBlocks = content;

  if (typeof content === 'string') {
    try {
      contentBlocks = JSON.parse(content);
    } catch (error) {
      console.error('Error parsing content string:', error);
      return <div>Error rendering content.</div>;
    }
  }

  if (!contentBlocks || !Array.isArray(contentBlocks)) {
    return <div>No content available.</div>;
  }

  const renderBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'heading': {
        const level = block.level || 2;
        const HeadingTag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag
            key={block.id}
            className={`mb-4 font-bold ${
              level === 1 ? 'text-3xl' :
              level === 2 ? 'text-2xl' :
              level === 3 ? 'text-xl' :
              'text-lg'
            }`}
          >
            {block.content}
          </HeadingTag>
        );
      }

      case 'text': {
        return (
          <p
            key={block.id}
            className="mb-4 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: block.content.replace(/\n/g, '<br />') }}
          />
        );
      }

      case 'image': {
        return (
          <div key={block.id} className="mb-6">
            <img
              src={block.content}
              alt="Blog content"
              className="max-w-full h-auto rounded-lg shadow-md mx-auto"
              loading="lazy"
            />
          </div>
        );
      }

      case 'list': {
        if (!block.items || !Array.isArray(block.items)) return null;

        return (
          <div
            key={block.id}
            className={`mb-4 ${
              block.ordered ? 'list-decimal list-inside' : 'list-disc list-inside'
            } space-y-1`}
          >
            {block.items.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="prose prose-lg max-w-none">
      {contentBlocks.map(renderBlock)}
    </div>
  );
}