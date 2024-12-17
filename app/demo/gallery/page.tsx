"use client";

import Gallery from "@/app/components/Gallery";

// 示例图片数据
const galleryImages = [
  {
    id: 2,
    src: "/images/demo/gallery-2.jpeg",
    data: {
      title: "图片标题1",
      description: "图片描述1",
    },
  },
  {
    id: 3,
    src: "/images/demo/gallery-3.jpeg",
    data: {
      title: "图片标题2",
      description: "图片描述2",
    },
  },
];

export default function GalleryDemo() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">图片画廊</h1>
        <p className="text-gray-600">点击图片可查看大图。</p>
      </div>
      <Gallery images={galleryImages} />
    </div>
  );
}
