import React, { useState, useEffect, useRef } from "react";
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
  HardDrive,
  Info,
  Layers,
  Sparkles,
  RefreshCw,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GalleryImage,
  GALLERY_CATEGORIES,
  fetchGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage,
  updateGalleryImage,
  getStorageStats,
} from "@/lib/gallery";
import {
  compressImage,
  formatBytes,
  CompressedImageResult,
} from "@/lib/image-compressor";

interface PendingUploadItem {
  id: string;
  originalFile: File;
  fileToUpload: File;
  previewUrl: string;
  title: string;
  description: string;
  category: string;
  originalSize: number;
  compressedSize: number;
  savingsPercent: number;
  width: number;
  height: number;
  status: "ready" | "uploading" | "done" | "error";
  errorMessage?: string;
}

interface GalleryManagerProps {
  onImagesUpdated?: () => void;
  showHeader?: boolean;
}

export default function GalleryManager({
  onImagesUpdated,
  showHeader = true,
}: GalleryManagerProps) {
  const [existingImages, setExistingImages] = useState<GalleryImage[]>([]);
  const [loadingExisting, setLoadingExisting] = useState(true);
  const [pendingQueue, setPendingQueue] = useState<PendingUploadItem[]>([]);
  const [defaultCategory, setDefaultCategory] = useState<string>("all");
  const [autoCompress, setAutoCompress] = useState<boolean>(true);
  const [compressing, setCompressing] = useState<boolean>(false);
  const [uploadingAll, setUploadingAll] = useState<boolean>(false);
  const [overallProgress, setOverallProgress] = useState<{ current: number; total: number }>({
    current: 0,
    total: 0,
  });
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [storageStats, setStorageStats] = useState<{
    totalFiles: number;
    usedMb: number;
    freeTierLimitMb: number;
    percentageUsed: number;
  } | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [activeTab, setActiveTab] = useState<"upload" | "manage">("upload");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing gallery images and storage usage
  const refreshGalleryData = async () => {
    setLoadingExisting(true);
    try {
      const [images, stats] = await Promise.all([
        fetchGalleryImages(),
        getStorageStats(),
      ]);
      setExistingImages(images);
      setStorageStats(stats);
      if (onImagesUpdated) onImagesUpdated();
    } catch (err) {
      console.error("Failed to load gallery data:", err);
    } finally {
      setLoadingExisting(false);
    }
  };

  useEffect(() => {
    refreshGalleryData();
  }, []);

  // Handle file selection (multi-file)
  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setCompressing(true);
    setStatusMessage({
      type: "info",
      text: `Processing & optimizing ${files.length} photo${files.length > 1 ? "s" : ""}...`,
    });

    const newItems: PendingUploadItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;

      try {
        let uploadFile = file;
        let preview = URL.createObjectURL(file);
        let origSize = file.size;
        let compSize = file.size;
        let savings = 0;
        let w = 0;
        let h = 0;

        if (autoCompress) {
          const compResult: CompressedImageResult = await compressImage(file, {
            maxWidth: 1920,
            maxHeight: 1920,
            quality: 0.82,
            outputFormat: "image/webp",
          });
          uploadFile = compResult.file;
          preview = compResult.previewUrl;
          origSize = compResult.originalSize;
          compSize = compResult.compressedSize;
          savings = compResult.savingsPercent;
          w = compResult.width;
          h = compResult.height;
        }

        // Generate clean title from filename
        const cleanName = file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]+/g, " ")
          .trim();
        const formattedTitle = cleanName ? cleanName.charAt(0).toUpperCase() + cleanName.slice(1) : "Hydroponic Photo";

        newItems.push({
          id: `pending-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          originalFile: file,
          fileToUpload: uploadFile,
          previewUrl: preview,
          title: formattedTitle,
          description: "",
          category: defaultCategory,
          originalSize: origSize,
          compressedSize: compSize,
          savingsPercent: savings,
          width: w,
          height: h,
          status: "ready",
        });
      } catch (err) {
        console.error("Compression error on file", file.name, err);
      }
    }

    setPendingQueue((prev) => [...prev, ...newItems]);
    setCompressing(false);
    setStatusMessage({
      type: "success",
      text: `Added ${newItems.length} photo${newItems.length > 1 ? "s" : ""} to upload queue. Review details below and click "Start Upload".`,
    });
  };

  // Remove single item from pending queue
  const removePendingItem = (id: string) => {
    setPendingQueue((prev) => prev.filter((item) => item.id !== id));
  };

  // Update item field in queue
  const updatePendingItem = (id: string, updates: Partial<PendingUploadItem>) => {
    setPendingQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  // Batch update category for all pending items
  const applyCategoryToAllPending = (cat: string) => {
    setDefaultCategory(cat);
    setPendingQueue((prev) => prev.map((item) => ({ ...item, category: cat })));
  };

  // Upload all items in pending queue sequentially
  const handleUploadAll = async () => {
    if (pendingQueue.length === 0) return;

    setUploadingAll(true);
    setOverallProgress({ current: 0, total: pendingQueue.length });

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < pendingQueue.length; i++) {
      const item = pendingQueue[i];
      setOverallProgress({ current: i + 1, total: pendingQueue.length });

      // Mark current item uploading
      updatePendingItem(item.id, { status: "uploading" });

      try {
        await uploadGalleryImage(item.fileToUpload, {
          title: item.title,
          description: item.description,
          category: item.category,
          width: item.width,
          height: item.height,
        });

        updatePendingItem(item.id, { status: "done" });
        successCount++;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Upload error";
        updatePendingItem(item.id, { status: "error", errorMessage: errorMsg });
        failCount++;
      }
    }

    setUploadingAll(false);

    if (failCount === 0) {
      setStatusMessage({
        type: "success",
        text: `Successfully uploaded all ${successCount} photo${successCount > 1 ? "s" : ""} to Supabase!`,
      });
      // Clear queue and switch to manage tab
      setTimeout(async () => {
        setPendingQueue([]);
        setActiveTab("manage");
        await refreshGalleryData();
      }, 1200);
    } else {
      setStatusMessage({
        type: "error",
        text: `Uploaded ${successCount} photo${successCount > 1 ? "s" : ""}, but ${failCount} failed. Check errors below.`,
      });
    }

    await refreshGalleryData();
  };

  // Delete existing image
  const handleDeleteExisting = async (image: GalleryImage) => {
    if (!confirm(`Are you sure you want to delete "${image.title}"?`)) return;

    try {
      await deleteGalleryImage(image.id, image.storage_path);
      setExistingImages((prev) => prev.filter((img) => img.id !== image.id));
      setStatusMessage({
        type: "success",
        text: `Deleted photo "${image.title}".`,
      });
      refreshGalleryData();
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: `Failed to delete photo: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  };

  const [manageCategoryFilter, setManageCategoryFilter] = useState<string>("all");

  // Calculations for pending batch savings
  const totalOriginalBytes = pendingQueue.reduce((acc, it) => acc + it.originalSize, 0);
  const totalCompressedBytes = pendingQueue.reduce((acc, it) => acc + it.compressedSize, 0);
  const totalSavingsBytes = Math.max(0, totalOriginalBytes - totalCompressedBytes);
  const totalSavingsPercent =
    totalOriginalBytes > 0
      ? Math.round((totalSavingsBytes / totalOriginalBytes) * 100)
      : 0;

  // Update existing image category or title
  const handleUpdateExisting = async (
    id: string,
    updates: { title?: string; category?: string; description?: string }
  ) => {
    try {
      await updateGalleryImage(id, updates);
      setExistingImages((prev) =>
        prev.map((img) => (img.id === id ? { ...img, ...updates } : img))
      );
      if (onImagesUpdated) onImagesUpdated();
      if (updates.category) {
        const catLabel =
          GALLERY_CATEGORIES.find((c) => c.id === updates.category)?.label || updates.category;
        setStatusMessage({
          type: "success",
          text: `Photo category updated to "${catLabel}"! Changes are now reflected live across the gallery.`,
        });
      }
    } catch (err) {
      console.error("Failed to update photo:", err);
      setStatusMessage({
        type: "error",
        text: `Failed to update photo: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  };

  // Filter existing images by search and selected category
  const filteredExisting = existingImages.filter((img) => {
    const q = searchFilter.toLowerCase();
    const matchesSearch =
      img.title.toLowerCase().includes(q) ||
      (img.description && img.description.toLowerCase().includes(q)) ||
      (img.category && img.category.toLowerCase().includes(q));
    const matchesCategory =
      manageCategoryFilter === "all" || img.category === manageCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-green-600" />
              Photo Gallery Manager
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Upload multiple photos, organize by category, and optimize storage for Supabase.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={refreshGalleryData}
              disabled={loadingExisting}
              className="gap-1.5"
            >
              <RefreshCw className={`w-4 h-4 ${loadingExisting ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      )}

      {/* Supabase Free Quota Health Card */}
      {storageStats && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border border-green-200 dark:border-green-900/50 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-green-600 text-white shadow-sm mt-0.5">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm md:text-base">
                  Supabase Storage Usage (Free Tier)
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-200/70 dark:bg-green-800/40 text-green-800 dark:text-green-300 font-medium">
                    1 GB Free Quota
                  </span>
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Currently using <strong className="text-foreground">{storageStats.usedMb} MB</strong> across{" "}
                  <strong className="text-foreground">{storageStats.totalFiles} photos</strong> ({storageStats.percentageUsed}% of 1 GB).
                </p>
              </div>
            </div>

            {/* Storage Progress Meter */}
            <div className="w-full md:w-64 space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-muted-foreground">Used</span>
                <span className="text-green-700 dark:text-green-400 font-semibold">
                  {storageStats.percentageUsed}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-green-200 dark:bg-green-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(storageStats.percentageUsed, 3))}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Selector */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-5 py-2.5 font-medium text-sm border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "upload"
              ? "border-green-600 text-green-600 font-semibold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload New Photos
          {pendingQueue.length > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-green-600 text-white font-bold">
              {pendingQueue.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("manage")}
          className={`px-5 py-2.5 font-medium text-sm border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "manage"
              ? "border-green-600 text-green-600 font-semibold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Layers className="w-4 h-4" />
          Manage Uploaded Library ({existingImages.length})
        </button>
      </div>

      {/* Status Alert Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl flex items-start justify-between gap-3 text-sm animate-in fade-in duration-300 ${
            statusMessage.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800 dark:bg-green-950/40 dark:border-green-900 dark:text-green-300"
              : statusMessage.type === "error"
              ? "bg-red-50 border border-red-200 text-red-800 dark:bg-red-950/40 dark:border-red-900 dark:text-red-300"
              : "bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-950/40 dark:border-blue-900 dark:text-blue-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
            ) : statusMessage.type === "error" ? (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-blue-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-xs font-semibold opacity-70 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 1: UPLOAD PHOTOS                                      */}
      {/* ========================================================== */}
      {activeTab === "upload" && (
        <div className="space-y-6">
          {/* Optimization Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoCompress}
                  onChange={(e) => setAutoCompress(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
              <div>
                <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Auto-Compress for Web (Recommended)
                </span>
                <p className="text-xs text-muted-foreground">
                  Shrinks 10MB camera photos to crisp ~250KB WebP (95% storage savings, lightning-fast loading).
                </p>
              </div>
            </div>

            {/* Default Category selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                Default Category:
              </label>
              <select
                value={defaultCategory}
                onChange={(e) => applyCategoryToAllPending(e.target.value)}
                className="text-xs rounded-lg border border-input bg-background px-3 py-1.5 focus:ring-2 focus:ring-green-500"
              >
                {GALLERY_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleFileSelect(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-green-300 dark:border-green-800 hover:border-green-500 rounded-2xl p-8 md:p-12 text-center cursor-pointer bg-green-50/40 dark:bg-green-950/10 hover:bg-green-50/80 transition-all group"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />

            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-semibold text-foreground">
              Select or Drag & Drop Multiple Photos
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              Select any number of photos from your device (JPG, PNG, WebP).
              Images are automatically optimized before uploading to Supabase Storage.
            </p>

            <div className="mt-5 inline-flex items-center gap-2">
              <Button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white font-medium shadow-md"
              >
                Browse Files
              </Button>
            </div>
          </div>

          {compressing && (
            <div className="p-6 rounded-2xl bg-card border border-border text-center space-y-3">
              <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto" />
              <p className="text-sm font-medium">
                Optimizing and compressing selected photos in browser...
              </p>
            </div>
          )}

          {/* Pending Queue List */}
          {pendingQueue.length > 0 && (
            <div className="space-y-4 pt-4">
              {/* Queue summary & Start Upload CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border shadow-sm">
                <div>
                  <h4 className="font-semibold text-foreground">
                    Upload Queue ({pendingQueue.length} photo{pendingQueue.length > 1 ? "s" : ""})
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Original size: <strong>{formatBytes(totalOriginalBytes)}</strong> ➔ Compressed:{" "}
                    <strong className="text-green-600">{formatBytes(totalCompressedBytes)}</strong>
                    {totalSavingsPercent > 0 && (
                      <span className="ml-2 font-semibold text-emerald-600">
                        ({totalSavingsPercent}% storage saved!)
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPendingQueue([])}
                    disabled={uploadingAll}
                  >
                    Clear All
                  </Button>
                  <Button
                    onClick={handleUploadAll}
                    disabled={uploadingAll || compressing}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium gap-2 shadow-md"
                  >
                    {uploadingAll ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading ({overallProgress.current}/{overallProgress.total})...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Start Upload ({pendingQueue.length})
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Individual Item Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingQueue.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-xl bg-card border border-border shadow-sm relative group"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-28 h-28 shrink-0 rounded-lg overflow-hidden bg-muted border">
                      <img
                        src={item.previewUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {item.savingsPercent > 0 && (
                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-600 text-white">
                          -{item.savingsPercent}%
                        </div>
                      )}
                    </div>

                    {/* Metadata inputs */}
                    <div className="flex-1 space-y-2 min-w-0">
                      <div>
                        <label className="text-[11px] font-medium text-muted-foreground uppercase">
                          Title
                        </label>
                        <Input
                          value={item.title}
                          onChange={(e) =>
                            updatePendingItem(item.id, { title: e.target.value })
                          }
                          placeholder="e.g., Commercial NFT Setup"
                          className="h-8 text-xs font-medium"
                          disabled={uploadingAll}
                        />
                      </div>

                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="text-[11px] font-medium text-muted-foreground uppercase">
                            Category
                          </label>
                          <select
                            value={item.category}
                            onChange={(e) =>
                              updatePendingItem(item.id, { category: e.target.value })
                            }
                            className="w-full h-8 text-xs rounded-md border border-input bg-background px-2 focus:ring-1 focus:ring-green-500"
                            disabled={uploadingAll}
                          >
                            {GALLERY_CATEGORIES.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="text-[11px] text-muted-foreground flex justify-between items-center pt-1">
                        <span>
                          {formatBytes(item.compressedSize)} ({item.width}×{item.height}px)
                        </span>

                        {item.status === "uploading" && (
                          <span className="text-blue-600 flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" /> Uploading...
                          </span>
                        )}
                        {item.status === "done" && (
                          <span className="text-green-600 font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Done
                          </span>
                        )}
                        {item.status === "error" && (
                          <span className="text-red-600 flex items-center gap-1" title={item.errorMessage}>
                            <AlertCircle className="w-3 h-3" /> Failed
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Remove button */}
                    {!uploadingAll && item.status !== "done" && (
                      <button
                        onClick={() => removePendingItem(item.id)}
                        className="p-1 rounded-full text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition absolute top-2 right-2"
                        title="Remove from queue"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 2: MANAGE UPLOADED LIBRARY                            */}
      {/* ========================================================== */}
      {activeTab === "manage" && (
        <div className="space-y-6">
          {/* Search bar & count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search photos by title, category..."
                className="pl-9 h-10 text-sm"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Showing {filteredExisting.length} of {existingImages.length} photos
            </p>
          </div>

          {/* Category Filter Pills in Manage View */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {GALLERY_CATEGORIES.map((cat) => {
              const count =
                cat.id === "all"
                  ? existingImages.length
                  : existingImages.filter((img) => img.category === cat.id).length;
              const isSelected = manageCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setManageCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-green-600 text-white shadow-sm"
                      : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-background text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {loadingExisting ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto" />
              <p className="text-sm text-muted-foreground">Loading gallery photos from Supabase...</p>
            </div>
          ) : filteredExisting.length === 0 ? (
            <div className="py-16 text-center border rounded-2xl border-dashed border-border bg-card">
              <ImageIcon className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <h4 className="text-base font-semibold text-foreground">No photos found</h4>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                {searchFilter
                  ? "No images matched your search filter."
                  : "You haven't uploaded any photos to the gallery yet."}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab("upload")}
                className="mt-4 gap-1.5 text-green-600 border-green-200 hover:bg-green-50"
              >
                <Upload className="w-4 h-4" />
                Upload Your First Photos
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredExisting.map((image) => (
                <div
                  key={image.id}
                  className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  {/* Photo Preview */}
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden group">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => handleDeleteExisting(image)}
                        className="p-2 rounded-full bg-black/60 hover:bg-red-600 text-white backdrop-blur-md transition shadow"
                        title="Delete photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {image.file_size ? (
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] bg-black/60 text-white font-medium backdrop-blur-md">
                        {formatBytes(image.file_size)}
                      </span>
                    ) : null}
                  </div>

                  {/* Details & Quick Edit */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <input
                        type="text"
                        defaultValue={image.title}
                        onBlur={(e) => {
                          if (e.target.value !== image.title) {
                            handleUpdateExisting(image.id, { title: e.target.value });
                          }
                        }}
                        className="w-full font-semibold text-sm bg-transparent border-b border-transparent hover:border-input focus:border-green-500 focus:outline-none transition py-0.5"
                        placeholder="Photo Title"
                      />

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
                          Category:
                        </span>
                        <select
                          value={image.category || "commercial"}
                          onChange={(e) =>
                            handleUpdateExisting(image.id, { category: e.target.value })
                          }
                          className="text-xs font-medium rounded-lg border border-input bg-background px-2.5 py-1 text-foreground focus:ring-2 focus:ring-green-500 shadow-sm w-full"
                        >
                          {GALLERY_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="text-[10px] text-muted-foreground pt-2 border-t border-border flex items-center justify-between">
                      <span>
                        {image.created_at
                          ? new Date(image.created_at).toLocaleDateString()
                          : "Uploaded"}
                      </span>
                      <a
                        href={image.image_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        View Full Size
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
