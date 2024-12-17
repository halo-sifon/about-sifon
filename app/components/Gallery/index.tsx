"use client";

import gsap from "gsap";
import Image, { StaticImageData } from "next/image";
import { useEffect, useCallback, useState, useRef } from "react";
import Modal from "@/app/components/Modal";

interface GalleryImage {
  id: number;
  src: string | StaticImageData;
  data: {
    title: string;
    description: string;
  };
}

interface GalleryProps {
  images: GalleryImage[];
}

// 预初始化 GSAP
gsap.config({
  autoSleep: 60,
  force3D: true,
  nullTargetWarn: false,
});

export default function Gallery({ images }: GalleryProps) {
  // 弹窗
  const [isOpen, setIsOpen] = useState(false);
  // timeline
  const tl = useRef<gsap.core.Timeline | null>(null);
  // 当前图片的
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);

  const handleImageClick = useCallback(
    (image: GalleryImage, e: React.MouseEvent) => {
      setCurrentImage(image);
      const target = e.currentTarget as HTMLElement;
      if (isOpen) return;
      // 获取图片容器
      const targetRect = target.getBoundingClientRect();
      const timeline = gsap.timeline();
      tl.current = timeline;
      timeline
        .to(target, {
          scale: 0.95,
          duration: 0.2,
          zIndex: 50,
          ease: "power2.in",
          onComplete: () => {
            setIsOpen(true);
          },
        })
        .to(target, {
          scale: 1,
          duration: 0.3,
          zIndex: 50,
          ease: "power2.out",
          width: "50vw",
          height: "100vh",
          objectFit: "contain",
          transform: `translate(-${targetRect.left}px, -${targetRect.top}px)`,
        });
    },
    [isOpen]
  );
  // 预热 GSAP
  useEffect(() => {
    // 创建一个临时元素并执行一个小动画来预热 GSAP
    const tempDiv = document.createElement("div");
    gsap.set(tempDiv, { scale: 1 });
    gsap.to(tempDiv, {
      scale: 1.01,
      duration: 0.01,
      onComplete: () => tempDiv.remove(),
    });
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          tl.current?.reverse();
          tl.current?.eventCallback("onReverseComplete", () => {
            tl.current?.kill();
          });
        }}
      >
        <div
          className="info-container flex flex-row-reverse"
          style={{ width: "100vw", height: "100vh" }}
        >
          <div className="w-1/2 p-4">
            <h1 className="text-2xl font-bold mb-4">
              {currentImage?.data.title}
            </h1>
            <p>姓名：乌拉拉</p>
            <p>性别：男</p>
            <p>年龄：18</p>
            <p>职业：学生</p>
            <p>爱好：打游戏</p>
            <p>座右铭：人生如戏</p>
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map(image => (
          <div
            key={image.id}
            className=" aspect-[2/3] bg-white cursor-pointer overflow-hidden rounded-lg will-change-transform relative"
            onClick={e => handleImageClick(image, e)}
          >
            <Image
              src={image.src}
              alt={image.data.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={image.id <= 6}
            />
          </div>
        ))}
      </div>
    </>
  );
}
