import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-4 border-t">
      <div className="max-w-4xl mx-auto flex justify-between items-center text-sm text-gray-600">
        <div>
          © {new Date().getFullYear()} Sifon的博客
        </div>
        <div className="flex gap-4">
          <Link href="https://github.com/sifon" className="hover:text-gray-900">
            GitHub
          </Link>
          <Link href="/rss" className="hover:text-gray-900">
            RSS
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 