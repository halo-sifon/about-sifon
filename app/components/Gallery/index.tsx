"use client";

import gsap from "gsap";
import Image from "next/image";

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  width: number;
  height: number;
}

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const handleImageClick = (image: GalleryImage, e: React.MouseEvent) => {
    const target = e.currentTarget;
    gsap.to(target, {
      scale: 0.95,
      duration: 0.2,
      // ease: "power2.out",
      onComplete: () => {
        gsap.to(target, {
          scale: 1,
          duration: 0.3,
          // ease: "bounce.out",
          // ease: "elastic.out(1, 0.3)",
        });
      },
    });
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map(image => (
          <div
            key={image.id}
            className="relative aspect-[3/2] cursor-pointer overflow-hidden rounded-lg"
            onClick={e => handleImageClick(image, e)}
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}