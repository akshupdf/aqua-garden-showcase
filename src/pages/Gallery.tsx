import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GalleryImage,
  GALLERY_CATEGORIES,
  fetchGalleryImages,
} from "@/lib/gallery";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import GalleryManager from "@/components/gallery/GalleryManager";
import {
  Search,
  Upload,
  X,
  Maximize2,
  Calendar,
  Leaf,
  Layers,
  LayoutGrid,
} from "lucide-react";

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLightboxImage, setActiveLightboxImage] = useState<GalleryImage | null>(null);
  const [viewMode, setViewMode] = useState<"grouped" | "grid">("grouped");

  // Admin session state (set if already authenticated via /admin)
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUploadPanel, setShowUploadPanel] = useState(false);

  // Check admin session
  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAdmin(true);
    }
  }, []);

  const loadGallery = async () => {
    setLoading(true);
    try {
      const data = await fetchGalleryImages();
      setImages(data);
    } catch (err) {
      console.error("Failed to load gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  // Filter images by category and search
  const filteredImages = images.filter((img) => {
    const matchesCategory =
      selectedCategory === "all" || img.category === selectedCategory;
    const matchesSearch =
      img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (img.description &&
        img.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Reusable Image Card Renderer
  const renderImageCard = (image: GalleryImage) => {
    const categoryObj = GALLERY_CATEGORIES.find((c) => c.id === image.category);

    return (
      <div
        key={image.id}
        onClick={() => setActiveLightboxImage(image)}
        className="group relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1"
      >
        {/* Image thumbnail container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={image.image_url}
            alt={image.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
            <div className="flex justify-end">
              <span className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>
            <div>
              <p className="text-xs text-white/80 line-clamp-2">
                {image.description || "Click to view fullscreen"}
              </p>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-black/80 text-foreground backdrop-blur-md shadow-sm">
              {categoryObj?.label || "Hydroponics"}
            </span>
          </div>
        </div>

        {/* Card Footer */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <h3 className="font-semibold text-foreground text-sm line-clamp-1 group-hover:text-green-600 transition-colors">
            {image.title}
          </h3>
          {image.created_at && (
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1">
              <Calendar className="w-3 h-3" />
              {new Date(image.created_at).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* ========================================== */}
        {/* HERO SECTION                               */}
        {/* ========================================== */}
        <section className="relative pt-12 pb-16 md:py-20 bg-gradient-to-b from-green-50/50 via-background to-background dark:from-green-950/20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border border-green-200 dark:border-green-800 shadow-sm">
                <Leaf className="w-3.5 h-3.5 text-green-600" />
                Live Showcase & Visual Portfolio
              </div>

              <h1
                className="text-4xl md:text-6xl font-bold tracking-tight text-foreground"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Our Hydroponic Systems <br />
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  & Farm Installations
                </span>
              </h1>

              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Explore our commercial hydroponic farms, rooftop NFT systems, vertical aeroponic towers, and bountiful pesticide-free harvests.
              </p>

              {/* Admin Quick Action Button (only visible if logged in as admin) */}
              {isAdmin && (
                <div className="pt-2 flex justify-center items-center gap-3">
                  <Button
                    onClick={() => setShowUploadPanel(!showUploadPanel)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium shadow-md gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {showUploadPanel ? "Close Uploader" : "Upload / Manage Photos"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* ADMIN UPLOAD PANEL (COLLAPSIBLE)           */}
        {/* ========================================== */}
        {isAdmin && showUploadPanel && (
          <section className="container mx-auto px-6 mb-12">
            <div className="p-6 md:p-8 rounded-3xl bg-card border-2 border-green-500/30 shadow-xl relative animate-in fade-in duration-300">
              <button
                onClick={() => setShowUploadPanel(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition"
              >
                <X className="w-5 h-5" />
              </button>

              <GalleryManager
                onImagesUpdated={loadGallery}
                showHeader={true}
              />
            </div>
          </section>
        )}

        {/* ========================================== */}
        {/* FILTER & SEARCH BAR                        */}
        {/* ========================================== */}
        <section className="container mx-auto px-6 pb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm">
            {/* Category Filter Pills with Live Counts */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {GALLERY_CATEGORIES.map((cat) => {
                const count =
                  cat.id === "all"
                    ? images.length
                    : images.filter((img) => img.category === cat.id).length;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-green-600 text-white shadow-md shadow-green-600/20 scale-[1.02]"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-background text-muted-foreground border border-border/50"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle & Search Input */}
            <div className="flex items-center gap-3">
              {selectedCategory === "all" && !searchQuery && (
                <div className="hidden sm:flex items-center bg-muted/60 p-1 rounded-xl border border-border">
                  <button
                    onClick={() => setViewMode("grouped")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                      viewMode === "grouped"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Divided Category Sections"
                  >
                    <Layers className="w-3.5 h-3.5 text-green-600" />
                    Sections
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                      viewMode === "grid"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Single Combined Grid"
                  >
                    <LayoutGrid className="w-3.5 h-3.5 text-green-600" />
                    Grid
                  </button>
                </div>
              )}

              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search photos..."
                  className="pl-9 h-9 text-xs rounded-xl"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* GALLERY DISPLAY                            */}
        {/* ========================================== */}
        <section className="container mx-auto px-6 pb-24">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden aspect-[4/3] bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-24 rounded-3xl border border-dashed border-border bg-card/50">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center text-green-600">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">No photos found</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mt-1">
                {searchQuery || selectedCategory !== "all"
                  ? "Try picking a different category or clearing your search."
                  : "No photos have been uploaded yet."}
              </p>

              <div className="mt-6 flex justify-center gap-3">
                {(searchQuery || selectedCategory !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}
                  >
                    View All Photos
                  </Button>
                )}
                {isAdmin && (
                  <Button
                    onClick={() => setShowUploadPanel(true)}
                    className="bg-green-600 hover:bg-green-700 text-white gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Photos Now
                  </Button>
                )}
              </div>
            </div>
          ) : selectedCategory === "all" && !searchQuery && viewMode === "grouped" ? (
            /* ========================================================== */
            /* 1. DIVIDED BY CATEGORY SECTIONS                            */
            /* ========================================================== */
            <div className="space-y-16">
              {GALLERY_CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
                const catImages = images.filter((img) => img.category === cat.id);
                if (catImages.length === 0) return null;

                return (
                  <div key={cat.id} className="space-y-6">
                    {/* Category Divider Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-300 flex items-center justify-center">
                          <Leaf className="w-4 h-4" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-foreground tracking-tight">
                            {cat.label}
                          </h2>
                          <p className="text-xs text-muted-foreground">
                            {catImages.length} photo{catImages.length > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedCategory(cat.id)}
                        className="text-xs font-semibold text-green-600 hover:text-green-700 hover:underline"
                      >
                        View only {cat.label} →
                      </button>
                    </div>

                    {/* Section Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {catImages.map((image) => renderImageCard(image))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ========================================================== */
            /* 2. FILTER-WISE GRID (Single Category or Search or Grid)    */
            /* ========================================================== */
            <div className="space-y-6">
              {selectedCategory !== "all" && (
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <h2 className="text-xl font-bold text-foreground">
                    {GALLERY_CATEGORIES.find((c) => c.id === selectedCategory)?.label || "Photos"}
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      ({filteredImages.length} photo{filteredImages.length > 1 ? "s" : ""})
                    </span>
                  </h2>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="text-xs font-semibold text-green-600 hover:underline"
                  >
                    ← Back to All Categories
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages.map((image) => renderImageCard(image))}
              </div>
            </div>
          )}
        </section>

        {/* ========================================== */}
        {/* LIGHTBOX MODAL                             */}
        {/* ========================================== */}
        {activeLightboxImage && (
          <GalleryLightbox
            image={activeLightboxImage}
            images={filteredImages}
            onClose={() => setActiveLightboxImage(null)}
            onNavigate={(next) => setActiveLightboxImage(next)}
          />
        )}

        {/* FOOTER */}
        <Footer />
      </div>
    </Layout>
  );
}
