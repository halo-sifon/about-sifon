import Link from "next/link";

const Header = () => {
  return (
    <header className="p-4 border-b">
      <nav className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          我的博客
        </Link>

        <ul className="flex gap-6">
          <li>
            <Link href="/" className="hover:text-gray-600">
              首页
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-gray-600">
              文章
            </Link>
          </li>
          <li>
            <Link href="/demo" className="hover:text-gray-600">
              Demo
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-600">
              关于
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
