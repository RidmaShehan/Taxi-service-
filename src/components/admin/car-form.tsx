"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCar, updateCar, uploadCarImage } from "@/lib/actions/cars";
import { MAX_IMAGE_SIZE_BYTES, validateImageFile } from "@/lib/images";
import type { CarRow } from "@/types/database.types";

type Props = {
  car?: CarRow;
  redirectTo?: string;
};

export function CarForm({ car, redirectTo = "/admin/fleet" }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(car?.image_url ?? "");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const clientError = validateImageFile(file);
    if (clientError) {
      setError(clientError);
      return;
    }
    setError(null);
    const fd = new FormData();
    fd.set("file", file);
    const result = await uploadCarImage(fd);
    if (result.url) setImageUrl(result.url);
    else if (result.error) setError(result.error);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    if (imageUrl) formData.set("image_url", imageUrl);

    const result = car
      ? await updateCar(car.id, formData)
      : await createCar(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Name</label>
        <input name="name" defaultValue={car?.name} required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
        <textarea name="description" defaultValue={car?.description ?? ""} rows={3} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category</label>
          <input name="category" defaultValue={car?.category ?? "Sedan"} required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Price / ride ($)</label>
          <input name="price_per_ride" type="number" step="0.01" defaultValue={car?.price_per_ride ?? 35} required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Seats</label>
          <input name="seats" type="number" defaultValue={car?.seats ?? 4} required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Luggage</label>
          <input name="luggage" type="number" defaultValue={car?.luggage ?? 2} required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Status</label>
          <select name="status" defaultValue={car?.status ?? "available"} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm">
            <option value="available">Available</option>
            <option value="in_service">In Service</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" value="true" defaultChecked={car?.featured} />
            Featured on homepage
          </label>
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Image</label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageUpload}
          className="text-sm"
        />
        <p className="text-xs text-slate-400 mt-1">
          JPEG, PNG, WebP, or GIF — max {MAX_IMAGE_SIZE_BYTES / (1024 * 1024)}MB. Saved as base64 in database.
        </p>
        {imageUrl && (
          <img src={imageUrl} alt="Preview" className="mt-2 h-24 rounded-lg object-cover" />
        )}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="px-6 py-2.5 bg-[#1e90ff] text-white rounded-lg text-sm font-semibold disabled:opacity-50">
        {loading ? "Saving..." : car ? "Update Vehicle" : "Add Vehicle"}
      </button>
    </form>
  );
}
