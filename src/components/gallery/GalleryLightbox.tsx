import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Download, ExternalLink, Calendar, Tag } from "lucide-react";
import { GalleryImage, GALLERY_CATEGORIES } from "@/lib/gallery";
import { formatBytes } from "@/lib/image-compressor";

interface GalleryLightboxProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  onClose: () => void;
  onNavigate: (nextImage: GalleryImage) => void;
}

export default function GalleryLightbox({
  image,
  images,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  if (!image) return null;

  const currentIndex = images.findIndex((img) => img.id === image.id);
  const total = images.length;

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(images[currentIndex - 1]);
    } else {
      onNavigate(images[images.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      onNavigate(images[currentIndex + 1]);
    } else {
      onNavigate(images[0]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [currentIndex, images]);

  const categoryLabel =
    GALLERY_CATEGORIES.find((c) => c.id === image.category)?.label || "Hydroponics";

  const formattedDate = image.created_at
    ? new Date(image.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top action bar */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 md:px-8 text-white/90 bg-gradient-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-white/70">
            {currentIndex + 1} / {total}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Tag className="w-3 h-3" />
            {categoryLabel}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={image.image_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white/10 transition text-white/80 hover:text-white"
            title="Open original image"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          <a
            href={image.image_url}
            download={image.title || "asquare-photo"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white/10 transition text-white/80 hover:text-white"
            title="Download image"
          >
            <Download className="w-5 h-5" />
          </a>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition text-white/80 hover:text-white ml-2"
            title="Close (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image View */}
      <div
        className="relative max-w-7xl max-h-[85vh] w-full mx-4 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.image_url}
          alt={image.title}
          className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
          loading="eager"
        />

        {/* Caption bar */}
        <div className="w-full max-w-3xl mt-4 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h3 className="text-lg font-semibold text-white truncate">{image.title}</h3>
            <div className="flex items-center gap-4 text-xs text-white/60">
              {formattedDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formattedDate}
                </span>
              )}
              {image.file_size ? (
                <span>{formatBytes(image.file_size)}</span>
              ) : null}
            </div>
          </div>
          {image.description && (
            <p className="mt-1 text-sm text-white/80 line-clamp-2">
              {image.description}
            </p>
          )}
        </div>
      </div>

      {/* Navigation Chevrons */}
      {total > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition shadow-lg hover:scale-105 active:scale-95"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition shadow-lg hover:scale-105 active:scale-95"
            aria-label="Next photo"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </>
      )}
    </div>
  );
}
