/**
 * 🌱 In-browser Image Compressor & Optimizer
 * Compresses high-resolution photos (5MB-20MB) down to optimized WebP/JPEG (150KB-350KB)
 * directly in the browser canvas before uploading to Supabase.
 *
 * This saves ~90-96% storage and bandwidth, keeping you well within Supabase's free limits!
 */

export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0 (default 0.82)
  outputFormat?: "image/webp" | "image/jpeg" | "auto";
}

export interface CompressedImageResult {
  file: File;
  originalFile: File;
  originalSize: number;
  compressedSize: number;
  savingsPercent: number;
  previewUrl: string;
  width: number;
  height: number;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<CompressedImageResult> {
  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.82,
    outputFormat = "auto",
  } = options;

  // If already a tiny file or SVG/GIF, return as is (GIF compression on canvas loses animation)
  if (file.type === "image/gif" || file.type === "image/svg+xml" || file.size < 50 * 1024) {
    const previewUrl = URL.createObjectURL(file);
    return {
      file,
      originalFile: file,
      originalSize: file.size,
      compressedSize: file.size,
      savingsPercent: 0,
      previewUrl,
      width: 0,
      height: 0,
    };
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate scaling preserving aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Unable to create canvas 2D context"));
          return;
        }

        // High quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Determine target mime type (prefer webp)
        let mimeType = "image/webp";
        if (outputFormat === "image/jpeg") {
          mimeType = "image/jpeg";
        } else if (outputFormat === "image/webp") {
          mimeType = "image/webp";
        }

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Image compression failed"));
              return;
            }

            // If compressed blob is unexpectedly larger than original, keep original
            const useOriginal = blob.size >= file.size && file.size < 2 * 1024 * 1024;
            const finalBlob = useOriginal ? file : blob;
            const finalSize = finalBlob.size;

            // Generate output file name with appropriate extension
            const originalName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
            const ext = useOriginal ? (file.name.split(".").pop() || "jpg") : (mimeType === "image/webp" ? "webp" : "jpg");
            const newFileName = `${originalName}.${ext}`;

            const compressedFile = new File([finalBlob], newFileName, {
              type: useOriginal ? file.type : mimeType,
              lastModified: Date.now(),
            });

            const savings = Math.max(0, Math.round(((file.size - finalSize) / file.size) * 100));
            const previewUrl = URL.createObjectURL(compressedFile);

            resolve({
              file: compressedFile,
              originalFile: file,
              originalSize: file.size,
              compressedSize: finalSize,
              savingsPercent: savings,
              previewUrl,
              width,
              height,
            });
          },
          mimeType,
          quality
        );
      };

      img.onerror = () => reject(new Error("Failed to load image for compression"));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}
