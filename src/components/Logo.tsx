"use client";

import Link from "next/link";
import LottieMascot from "./LottieMascot";

type LogoProps = {
  href?: string;
};

const Logo = ({ href = "/learn" }: LogoProps) => {
  return (
    <Link href={href}>
      <div className="flex items-center gap-x-3 px-4 py-8">
        <LottieMascot width={40} height={40} />

        <h1 className="text-3xl font-extrabold tracking-wide text-green-600">
          Lango
        </h1>
      </div>
    </Link>
  );
};

export default Logo;

