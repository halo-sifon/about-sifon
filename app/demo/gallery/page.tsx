import Gallery from "@/app/components/Gallery";

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    title: "自然风光",
    width: 1920,
    height: 1280,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538",
    title: "海洋风景",
    width: 1920,
    height: 1280,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b",
    title: "山川河流",
    width: 1920,
    height: 1280,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1682687220923-c58b9a4592ae",
    title: "日落黄昏",
    width: 1920,
    height: 1280,
  },

  {
    id: 7,
    src: "https://images.unsplash.com/photo-1682687220198-88e9bdea9931",
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
