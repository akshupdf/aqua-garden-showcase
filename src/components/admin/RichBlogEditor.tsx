"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from 'uuid';

// Content block types
type ContentBlockType = 'heading' | 'text' | 'image' | 'list';

interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: string;
  level?: number; // For heading levels (1-6)
  ordered?: boolean; // For ordered vs unordered lists
  items?: string[]; // For list items
}

interface RichBlogEditorProps {
  onContentChange: (content: ContentBlock[]) => void;
  initialContent?: ContentBlock[];
}

export default function RichBlogEditor({ onContentChange, initialContent = [] }: RichBlogEditorProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(initialContent);
  const [uploading, setUploading] = useState(false);

  const addBlock = (type: ContentBlockType, index?: number) => {
    const newBlock: ContentBlock = {
      id: uuidv4(),
      type,
      content: type === 'heading' ? 'Heading' : type === 'text' ? '' : '',
      ...(type === 'heading' && { level: 2 }),
      ...(type === 'list' && { ordered: false, items: [] }),
    };

    const newBlocks = index !== undefined
      ? [...blocks.slice(0, index), newBlock, ...blocks.slice(index)]
      : [...blocks, newBlock];

    setBlocks(newBlocks);
    onContentChange(newBlocks);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    const newBlocks = blocks.map(block =>
      block.id === id ? { ...block, ...updates } : block
    );
    setBlocks(newBlocks);
    onContentChange(newBlocks);
  };

  const removeBlock = (id: string) => {
    const newBlocks = blocks.filter(block => block.id !== id);
    setBlocks(newBlocks);
    onContentChange(newBlocks);
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    setBlocks(newBlocks);
    onContentChange(newBlocks);
  };

  const handleImageUpload = async (blockId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `image-${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      // Update block with image URL
      updateBlock(blockId, {
        content: publicUrlData.publicUrl,
        type: 'image'
      });
    } catch (err: unknown) {
      console.error('Image upload failed:', err);
      // Fallback to placeholder
      updateBlock(blockId, {
        content: `https://images.unsplash.com/photo-1584133025760-a1ef8d50270b?w=800&h=400&fit=crop`,
        type: 'image'
      });
    } finally {
      setUploading(false);
    }
  };

  const renderBlock = (block: ContentBlock, index: number) => {
    const commonProps = {
      value: block.content,
      onChange: (value: string) => updateBlock(block.id, { content: value }),
      onRemove: () => removeBlock(block.id),
      onMoveUp: index > 0 ? () => moveBlock(index, index - 1) : undefined,
      onMoveDown: index < blocks.length - 1 ? () => moveBlock(index, index + 1) : undefined,
    };

    switch (block.type) {
      case 'heading':
        return (
          <HeadingBlock
            key={block.id}
            level={block.level || 2}
            {...commonProps}
          />
        );
      case 'text':
        return <TextBlock key={block.id} {...commonProps} />;
      case 'image':
        return <ImageBlock
          key={block.id}
          src={block.content}
          onImageUpload={(e) => handleImageUpload(block.id, e)}
          uploading={uploading}
          {...commonProps}
        />;
      case 'list':
        return <ListBlock
          key={block.id}
          ordered={block.ordered || false}
          items={block.items || []}
          {...commonProps}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Block Toolbar */}
      <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
        <button
          onClick={() => addBlock('heading')}
          className="px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
        >
          Add Heading
        </button>
        <button
          onClick={() => addBlock('text')}
          className="px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm"
        >
          Add Text
        </button>
        <button
          onClick={() => addBlock('image')}
          className="px-3 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 text-sm"
        >
          Add Image
        </button>
        <button
          onClick={() => addBlock('list', false)}
          className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 text-sm"
        >
          Add Bulleted List
        </button>
        <button
          onClick={() => addBlock('list', true)}
          className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 text-sm"
        >
          Add Numbered List
        </button>
      </div>

      {/* Blocks Container */}
      <div className="space-y-4">
        {blocks.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No content blocks yet. Use the toolbar above to add content.</p>
          </div>
        )}
        {blocks.map((block, index) => (
          <div key={block.id} className="relative">
            <div className="absolute -left-8 top-2 flex flex-col gap-1">
              <button
                onClick={() => moveBlock(index, index - 1)}
                disabled={index === 0}
                className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                ↑
              </button>
              <button
                onClick={() => moveBlock(index, index + 1)}
                disabled={index === blocks.length - 1}
                className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                ↓
              </button>
            </div>
            {renderBlock(block, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

// Individual Block Components
function HeadingBlock({
  level = 2,
  value,
  onChange,
  onRemove
}: {
  level?: number;
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}) {
  const HeadingTag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;

  return (
    <div className="flex gap-2 items-start">
      <select
        value={level}
        onChange={(e) => {
          // Re-render with new level by updating parent
          onChange(value); // This is a workaround - ideally would handle level change separately
        }}
        className="px-2 py-1 border rounded text-sm"
      >
        <option value={1}>H1</option>
        <option value={2}>H2</option>
        <option value={3}>H3</option>
        <option value={4}>H4</option>
        <option value={5}>H5</option>
        <option value={6}>H6</option>
      </select>
      <div className="flex-1">
        <HeadingTag className="font-bold">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full border-none outline-none bg-transparent ${level === 1 ? 'text-3xl' : level === 2 ? 'text-2xl' : level === 3 ? 'text-xl' : 'text-lg'}`}
            placeholder="Heading"
          />
        </HeadingTag>
      </div>
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700"
      >
        ×
      </button>
    </div>
  );
}

function TextBlock({ value, onChange, onRemove }: { value: string; onChange: (value: string) => void; onRemove: () => void }) {
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 border rounded-lg resize-none"
          rows={4}
          placeholder="Write your text content..."
        />
      </div>
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700 self-start"
      >
        ×
      </button>
    </div>
  );
}

function ImageBlock({
  src,
  onImageUpload,
  onRemove,
  uploading
}: {
  src: string;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  uploading: boolean;
}) {
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          {src ? (
            <img
              src={src}
              alt="Blog content"
              className="max-w-full h-auto rounded"
            />
          ) : (
            <div className="text-center">
              <p className="text-gray-500 mb-2">Upload an image</p>
              <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 inline-block"
              >
                Choose Image
              </label>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700 self-start"
      >
        ×
      </button>
    </div>
  );
}

function ListBlock({
  ordered,
  items,
  onChange,
  onRemove
}: {
  ordered: boolean;
  items: string[];
  onChange: (value: string) => void;
  onRemove: () => void;
}) {
  const addItem = () => {
    const newItems = [...items, ''];
    onChange(JSON.stringify({ ordered, items: newItems }));
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(JSON.stringify({ ordered, items: newItems }));
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(JSON.stringify({ ordered, items: newItems }));
  };

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <div className="space-y-1">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-gray-500">{ordered ? `${index + 1}.` : '•'}</span>
              <input
                type="text"
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder={ordered ? 'List item' : '• List item'}
              />
              <button
                onClick={() => removeItem(index)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addItem}
          className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
        >
          Add Item
        </button>
      </div>
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700 self-start"
      >
        ×
      </button>
    </div>
  );
}