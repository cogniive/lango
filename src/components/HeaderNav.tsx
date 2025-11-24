"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/constants";

const HeaderNav = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-6">
      {sidebarItems.map((item, index) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        
        return (
          <Link 
            key={index}
            href={item.href} 
            className={`flex items-center gap-2 transition-colors ${
              isActive 
                ? "text-blue-600 font-semibold" 
                : "text-gray-400 hover:text-blue-600"
            }`}
          >
            <Image 
              src={item.iconSrc} 
              alt={item.label}
              width={20}
              height={20}
              className={`object-contain ${isActive ? "opacity-100" : "opacity-60"}`}
            />
            <span className="font-medium capitalize">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default HeaderNav;
