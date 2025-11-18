import { Navbar } from '@/components/Navbar';
import Gallery, { GalleryImage } from './Gallery';
import { Footer } from '@/components/Footer';

const GalleryPage = () => {
  const images: GalleryImage[] = [
    { id: 1, src: '/aniverssary.jpg', alt: 'Image 1' },
    { id: 2, src: '/aniverssary.jpg', alt: 'Image 2' },
    { id: 3, src: '/aniverssary.jpg', alt: 'Image 3' },
    { id: 4, src: '/aniverssary.jpg', alt: 'Image 4' },
  ];

  return (
    <>
      <Navbar />
      <Gallery images={images} />;
      <Footer />
    </>
  );
};

export default GalleryPage;
