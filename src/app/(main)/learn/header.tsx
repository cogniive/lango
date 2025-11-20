import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { sidebarItems } from "@/constants";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => (
  <div className="sticky top-[60px] md:top-0 flex items-center justify-between border-b-2 bg-white mb-5 py-3 z-50 md:mt-[-28px] md:pt-[28px] px-4">
    {/* Logo */}
    <div className="flex items-center">
      <div className="text-2xl font-bold text-blue-600 italic">
        Lango
      </div>
    </div>

    {/* Navigation Items */}
    <nav className="hidden md:flex items-center gap-6">
      {sidebarItems.map((item, index) => (
        <Link 
          key={index}
          href={item.href} 
          className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors"
        >
          <Image 
            src={item.iconSrc} 
            alt={item.label}
            width={20}
            height={20}
            className="object-contain"
          />
          <span className="font-medium capitalize">{item.label}</span>
        </Link>
      ))}
    </nav>

    {/* Right Side - Points and Profile */}
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 px-3 py-1 rounded-full border-2 border-gray-200">
        <span className="text-yellow-500 text-lg">⚡</span>
        <span className="font-bold text-gray-700">1</span>
      </div>
      <Link href="/profile" className="flex items-center gap-2 text-gray-400 hover:text-gray-600">
        <User className="h-5 w-5" />
        <span className="font-medium hidden md:inline">Profile</span>
      </Link>
    </div>
  </div>
);

export default Header;
