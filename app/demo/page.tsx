import { NextPage } from 'next';
import Link from 'next/link';

interface DemoItem {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

const demoItems: DemoItem[] = [
  {
    title: "图片画廊",
    description: "响应式图片展示组件，支持图片预览和轮播",
    link: "/demo/gallery",
    tags: ["React", "图片处理"]
  },
  {
    title: "数据可视化",
    description: "使用 ECharts 实现的数据图表展示",
    link: "/demo/charts",
    tags: ["ECharts", "数据"]
  },
  {
    title: "动画效果",
    description: "使用 Framer Motion 实现的页面动画效果",
    link: "/demo/animation",
    tags: ["动画", "交互"]
  },
  {
    title: "表单验证",
    description: "基于 React Hook Form 的表单验证示例",
    link: "/demo/form",
    tags: ["表单", "验证"]
  },
  {
    title: "状态管理",
    description: "使用 Redux Toolkit 的状态管理示例",
    link: "/demo/state",
    tags: ["Redux", "状态管理"]
  },
  {
    title: "实时通信",
    description: "基于 WebSocket 的实时通信示例",
    link: "/demo/realtime",
    tags: ["WebSocket", "实时"]
  }
];

const DemoPage: NextPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Demo 展示</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoItems.map((demo, index) => (
          <Link 
            href={demo.link} 
            key={index}
            className="block group"
          >
            <div className="border rounded-lg p-6 h-full hover:shadow-lg transition-shadow duration-300 bg-white">
              <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-600">
                {demo.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {demo.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {demo.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DemoPage; 