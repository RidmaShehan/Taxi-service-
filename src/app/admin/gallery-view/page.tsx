import { getGalleryImages } from "@/lib/actions/gallery";
import { getCars } from "@/lib/actions/cars";
import { GalleryManager } from "@/components/admin/gallery-manager";

export default async function GalleryViewPage() {
  const [images, cars] = await Promise.all([getGalleryImages(), getCars()]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Gallery View</h1>
      <p className="text-sm text-slate-500 mb-8">Review all uploaded media and control visibility on public pages.</p>
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6">
        <GalleryManager images={images} cars={cars} />
      </div>
    </div>
  );
}
