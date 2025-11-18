import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export interface GalleryImage {
  id: number | string;
  src: string;
  alt?: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<GalleryImage | null>(null);

  const handleOpen = (img: GalleryImage) => {
    setSelectedImg(img);
    setOpen(true);
  };

  return (
    <div className="w-full py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md"
            onClick={() => handleOpen(img)}
          >
            <img
              src={img.src}
              alt={img.alt || 'gallery image'}
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center text-white font-semibold">
              View
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 max-w-3xl">
          {selectedImg && <img src={selectedImg.src} alt={selectedImg.alt} className="w-full h-auto rounded-lg" />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
