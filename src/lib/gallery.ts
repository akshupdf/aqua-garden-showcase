import { supabase, supabaseAdmin } from "./supabase";

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  category: string;
  image_url: string;
  storage_path: string;
  file_size?: number;
  width?: number;
  height?: number;
  created_at: string;
}

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All Photos" },
  { id: "commercial", label: "Commercial Farms" },
  { id: "home", label: "Home Systems" },
  { id: "towers", label: "Vertical Towers" },
  { id: "nft", label: "NFT Channels" },
  { id: "produce", label: "Fresh Harvest" },
  { id: "installations", label: "Installations & Setups" },
] as const;

export type GalleryCategoryId = typeof GALLERY_CATEGORIES[number]["id"];

const BUCKET_NAME = "gallery-images";
const METADATA_FILENAME = "gallery-metadata.json";

interface MetadataEntry {
  id?: string;
  title: string;
  description?: string;
  category: string;
  width?: number;
  height?: number;
  created_at?: string;
  updated_at?: string;
}

type MetadataMap = Record<string, MetadataEntry>;

/**
 * Load metadata dictionary from Supabase Storage
 */
async function loadStorageMetadata(client: any): Promise<MetadataMap> {
  try {
    const { data, error } = await client.storage
      .from(BUCKET_NAME)
      .download(METADATA_FILENAME);

    if (error || !data) {
      return {};
    }

    const text = await data.text();
    return JSON.parse(text) as MetadataMap;
  } catch (err) {
    console.warn("Could not read storage metadata:", err);
    return {};
  }
}

/**
 * Save metadata dictionary to Supabase Storage
 */
async function saveStorageMetadata(client: any, metaMap: MetadataMap): Promise<boolean> {
  try {
    const blob = new Blob([JSON.stringify(metaMap, null, 2)], {
      type: "application/json",
    });

    const { error } = await client.storage
      .from(BUCKET_NAME)
      .upload(METADATA_FILENAME, blob, {
        contentType: "application/json",
        upsert: true,
      });

    if (error) {
      console.warn("Could not save storage metadata:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Failed saving metadata to storage:", err);
    return false;
  }
}

/**
 * Ensures bucket exists and allows necessary mime types
 */
export async function ensureGalleryBucket(): Promise<boolean> {
  const clientToUse = supabaseAdmin || supabase;
  try {
    const { data: buckets } = await clientToUse.storage.listBuckets();
    const exists = buckets?.some((b: any) => b.name === BUCKET_NAME);
    if (!exists) {
      const { error } = await clientToUse.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
          "application/json",
        ],
      });
      if (error) {
        console.warn("Could not create bucket:", error.message);
        return false;
      }
    }
    return true;
  } catch (err) {
    console.warn("Bucket check error:", err);
    return false;
  }
}

/**
 * Fetch all gallery images.
 * Queries `gallery_images` table, with graceful fallback to storage bucket listing
 * merged with persistent `gallery-metadata.json`.
 */
export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  try {
    const clientToUse = supabaseAdmin || supabase;

    // 1. Try fetching from SQL table first
    const { data: dbData, error: dbError } = await clientToUse
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (!dbError && dbData && dbData.length > 0) {
      return dbData as GalleryImage[];
    }

    // 2. Fetch directly from Supabase storage bucket + metadata JSON
    const [{ data: storageFiles, error: storageError }, metadataMap] = await Promise.all([
      clientToUse.storage
        .from(BUCKET_NAME)
        .list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } }),
      loadStorageMetadata(clientToUse),
    ]);

    if (storageError) {
      console.error("Storage list error:", storageError);
      return [];
    }

    if (!storageFiles || storageFiles.length === 0) {
      return [];
    }

    return storageFiles
      .filter((file: any) => !file.name.startsWith(".") && file.name !== METADATA_FILENAME)
      .map((file: any) => {
        const { data: pubData } = clientToUse.storage
          .from(BUCKET_NAME)
          .getPublicUrl(file.name);

        const cleanTitle = file.name
          .replace(/^gallery-\d+-/, "")
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]+/g, " ");

        // Look up metadata by filename or file.id
        const fileMeta = metadataMap[file.name] || metadataMap[file.id] || {};

        return {
          id: file.id || file.name,
          title:
            fileMeta.title ||
            (cleanTitle ? cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1) : "Hydroponic Project"),
          description: fileMeta.description || "",
          category: fileMeta.category || "commercial",
          image_url: pubData.publicUrl,
          storage_path: file.name,
          file_size: file.metadata?.size || 0,
          created_at: fileMeta.created_at || file.created_at || new Date().toISOString(),
        };
      });
  } catch (err) {
    console.error("Error in fetchGalleryImages:", err);
    return [];
  }
}

/**
 * Upload an image to Supabase Storage and register in metadata/database
 */
export async function uploadGalleryImage(
  file: File,
  meta: {
    title: string;
    description?: string;
    category?: string;
    width?: number;
    height?: number;
  }
): Promise<GalleryImage> {
  await ensureGalleryBucket();

  const fileExt = file.name.split(".").pop() || "webp";
  const sanitizedTitle =
    meta.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
      .slice(0, 40) || "photo";

  const storageFileName = `gallery-${Date.now()}-${sanitizedTitle}.${fileExt}`;
  const clientToUse = supabaseAdmin || supabase;

  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await clientToUse.storage
    .from(BUCKET_NAME)
    .upload(storageFileName, file, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // Get public URL
  const { data: publicUrlData } = clientToUse.storage
    .from(BUCKET_NAME)
    .getPublicUrl(storageFileName);

  const finalCategory = meta.category && meta.category !== "all" ? meta.category : "commercial";
  const createdAt = new Date().toISOString();

  // Save to persistent storage metadata
  try {
    const metaMap = await loadStorageMetadata(clientToUse);
    metaMap[storageFileName] = {
      id: uploadData?.path || storageFileName,
      title: meta.title.trim() || "Hydroponic Project",
      description: meta.description?.trim() || "",
      category: finalCategory,
      width: meta.width,
      height: meta.height,
      created_at: createdAt,
    };
    await saveStorageMetadata(clientToUse, metaMap);
  } catch (mErr) {
    console.warn("Storage metadata write warning:", mErr);
  }

  const newImageRecord: Partial<GalleryImage> = {
    title: meta.title.trim() || "Hydroponic Project",
    description: meta.description?.trim() || "",
    category: finalCategory,
    image_url: publicUrlData.publicUrl,
    storage_path: storageFileName,
    file_size: file.size,
    width: meta.width || undefined,
    height: meta.height || undefined,
  };

  // Try inserting into SQL table
  try {
    const { data: insertData, error: insertError } = await clientToUse
      .from("gallery_images")
      .insert([newImageRecord])
      .select()
      .single();

    if (!insertError && insertData) {
      return insertData as GalleryImage;
    }
  } catch (sqlErr) {
    console.warn("SQL table insert warning:", sqlErr);
  }

  return {
    id: uploadData?.path || storageFileName,
    title: newImageRecord.title!,
    description: newImageRecord.description,
    category: finalCategory,
    image_url: newImageRecord.image_url!,
    storage_path: storageFileName,
    file_size: file.size,
    width: meta.width,
    height: meta.height,
    created_at: createdAt,
  };
}

/**
 * Delete a photo from Supabase Storage, metadata, and database
 */
export async function deleteGalleryImage(id: string, storagePath: string): Promise<boolean> {
  const clientToUse = supabaseAdmin || supabase;

  // Delete from storage
  if (storagePath) {
    await clientToUse.storage.from(BUCKET_NAME).remove([storagePath]);
  }

  // Remove from storage metadata
  try {
    const metaMap = await loadStorageMetadata(clientToUse);
    if (metaMap[storagePath]) delete metaMap[storagePath];
    if (metaMap[id]) delete metaMap[id];
    await saveStorageMetadata(clientToUse, metaMap);
  } catch (mErr) {
    console.warn("Storage metadata delete warning:", mErr);
  }

  // Delete from DB if table exists
  try {
    await clientToUse
      .from("gallery_images")
      .delete()
      .or(`id.eq.${id},storage_path.eq.${storagePath}`);
  } catch (dbErr) {
    console.warn("DB deletion warning:", dbErr);
  }

  return true;
}

/**
 * Update photo title, category, description with persistent storage
 */
export async function updateGalleryImage(
  id: string,
  updates: { title?: string; description?: string; category?: string }
): Promise<boolean> {
  const clientToUse = supabaseAdmin || supabase;

  // 1. Update metadata in storage JSON
  try {
    const metaMap = await loadStorageMetadata(clientToUse);
    const key = Object.keys(metaMap).find((k) => k === id || metaMap[k]?.id === id) || id;

    metaMap[key] = {
      ...(metaMap[key] || { title: "Hydroponic Project", category: "commercial" }),
      ...updates,
      updated_at: new Date().toISOString(),
    };

    await saveStorageMetadata(clientToUse, metaMap);
  } catch (mErr) {
    console.warn("Storage metadata update warning:", mErr);
  }

  // 2. Try DB update if table exists
  try {
    await clientToUse.from("gallery_images").update(updates).eq("id", id);
  } catch (dbErr) {
    console.warn("DB update warning:", dbErr);
  }

  return true;
}

/**
 * Get storage statistics (total files and estimated bytes)
 */
export async function getStorageStats(): Promise<{
  totalFiles: number;
  totalBytes: number;
  usedMb: number;
  freeTierLimitMb: number;
  percentageUsed: number;
}> {
  const FREE_TIER_MB = 1024; // 1 GB
  try {
    const clientToUse = supabaseAdmin || supabase;
    const { data: files } = await clientToUse.storage
      .from(BUCKET_NAME)
      .list("", { limit: 1000 });

    if (!files) {
      return { totalFiles: 0, totalBytes: 0, usedMb: 0, freeTierLimitMb: FREE_TIER_MB, percentageUsed: 0 };
    }

    const validFiles = files.filter(
      (f: any) => !f.name.startsWith(".") && f.name !== METADATA_FILENAME
    );
    const totalBytes = validFiles.reduce((acc: number, f: any) => acc + (f.metadata?.size || 0), 0);
    const usedMb = +(totalBytes / (1024 * 1024)).toFixed(2);
    const percentageUsed = +((usedMb / FREE_TIER_MB) * 100).toFixed(2);

    return {
      totalFiles: validFiles.length,
      totalBytes,
      usedMb,
      freeTierLimitMb: FREE_TIER_MB,
      percentageUsed,
    };
  } catch {
    return { totalFiles: 0, totalBytes: 0, usedMb: 0, freeTierLimitMb: FREE_TIER_MB, percentageUsed: 0 };
  }
}
