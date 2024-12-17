import { gsap } from "gsap"; // 导入 GSAP
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// 定义 ModalProps 接口，包含弹窗的属性
interface ModalProps {
  isOpen: boolean; // 控制弹窗是否打开
  onClose: () => void; // 关闭弹窗的回调函数
  children: ReactNode; // 弹窗内的子元素
}

// 创建 Modal 组件
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const [_isOpen, set_IsOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
      document.body.classList.add("overflow-hidden"); // 添加禁止滚动的类

      // 使用 GSAP 动画打开弹窗
      gsap.fromTo(
        modalRef.current,
        { scale: 0, opacity: 0 }, // 初始状态
        { scale: 1, opacity: 1, duration: 0.2 } // 结束状态
      );

      set_IsOpen(true); // 更新状态
    } else {
      // 使用 GSAP 动画关闭弹窗
      gsap.to(modalRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          document.body.classList.remove("overflow-hidden"); // 移除禁止滚动的类
          lastFocusedElement.current?.focus();
          set_IsOpen(false);
        },
      });
    }
  }, [isOpen]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return _isOpen || isOpen
    ? createPortal(
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
          onClick={handleBackgroundClick}
          ref={modalRef}
          tabIndex={-1}
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-xl">
            <button
              type="button"
              className="absolute top-4 right-4"
              onClick={onClose}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="box-border">{children}</div>
          </div>
        </div>,
        document.body
      )
    : null;
};

// 导出 Modal 组件
export default Modal;
