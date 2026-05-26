"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import {
  uploadGalleryImage,
  deleteGalleryImage,
  toggleGalleryVisibility,
  setGalleryCarCover,
} from "@/lib/actions/gallery";
import { MAX_IMAGE_SIZE_BYTES, validateImageFile } from "@/lib/images";
import type { CarRow, GalleryImageRow } from "@/types/database.types";

type Props = {
  images: GalleryImageRow[];
  cars: CarRow[];
};

export function GalleryManager({ images, cars }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const clientError = validateImageFile(file);
    if (clientError) {
      setError(clientError);
      return;
    }
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.set("file", file);
    const result = await uploadGalleryImage(fd);
    if (result.error) setError(result.error);
    setUploading(false);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this image?")) return;
    await deleteGalleryImage(id);
    router.refresh();
  }

  async function handleToggle(id: string, visible: boolean) {
    await toggleGalleryVisibility(id, !visible);
    router.refresh();
  }

  async function handleSetCover(carId: string, imageUrl: string) {
    await setGalleryCarCover(carId, imageUrl);
    router.refresh();
  }

  return (
    <div>
      <label className="border-2 border-dashed border-slate-200 rounded-xl p-6 md:p-10 text-center mb-6 bg-slate-50/50 hover:bg-slate-50 cursor-pointer block">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
        <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1e90ff] flex items-center justify-center mx-auto mb-3">
          <Upload className="w-5 h-5" />
        </div>
        <div className="font-bold text-slate-900 text-sm mb-1">
          {uploading ? "Saving to database..." : "Click to upload vehicle images"}
        </div>
        <div className="text-xs text-slate-400">
          JPEG, PNG, WebP, or GIF — max {MAX_IMAGE_SIZE_BYTES / (1024 * 1024)}MB (saved as base64)
        </div>
      </label>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {images.length === 0 ? (
        <p className="text-sm text-slate-500">No gallery images yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="rounded-xl overflow-hidden border border-slate-200 relative group">
              <img src={img.image_url} alt={img.caption ?? "Gallery"} className="w-full h-32 object-cover" />
              {!img.is_visible && (
                <div className="absolute top-2 left-2 bg-slate-900/70 text-white text-[10px] px-2 py-0.5 rounded">Hidden</div>
              )}
              <div className="p-3">
                <p className="text-xs font-semibold text-slate-700 truncate">{img.caption ?? "Vehicle image"}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <button
                    onClick={() => handleToggle(img.id, img.is_visible)}
                    className="text-[10px] text-[#1e90ff] font-semibold"
                  >
                    {img.is_visible ? "Hide" : "Show"}
                  </button>
                  {cars[0] && (
                    <button
                      onClick={() => handleSetCover(cars[0].id, img.image_url)}
                      className="text-[10px] text-slate-600 font-semibold"
                    >
                      Set as car cover
                    </button>
                  )}
                  <button onClick={() => handleDelete(img.id)} className="text-[10px] text-red-600 font-semibold ml-auto">
                    <X className="w-3 h-3 inline" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
