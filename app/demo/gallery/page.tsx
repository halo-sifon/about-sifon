import Gallery from "@/app/components/Gallery";

import image2 from "@/assets/images/gallery/2.jpeg";
import image3 from "@/assets/images/gallery/3.jpeg";
import image5 from "@/assets/images/gallery/5.jpeg";
const images = [
  {
    id: 2,
    src: image2,
    title: "海洋风景",
    width: 1920,
    height: 1280,
  },
  {
    id: 3,
    src: image3,
    title: "山川河流",
    width: 1920,
    height: 1280,
  },

  {
    id: 5,
    src: image5,
    title: "森林小路",
    width: 1920,
    height: 1280,
  },
];

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">图片画廊</h1>
      </div>

      <Gallery images={images} />
    </div>
  );
}
