
'use client';
import Logo from "./Logo";
import { Button } from "./ui";

const HeaderMain = ({user, isPro, children}: {user: any, isPro: boolean, children: React.ReactNode}) => {
//   const hideHeader = useHeaderHideStatus();
    return (
    <div className="fixed top-0 left-0 right-0 border-b-2 bg-white py-3 z-50">
        <div className="mx-auto max-w-[1040px] flex items-center justify-between px-6">
        {/* Logo */}
        <Logo />

        {/* Navigation Items */}

        {/* Right Side - Points and Profile */}
        <div className="flex items-center gap-4">
            {children}
            
        </div>
        </div>
    </div>
  );
};

export default HeaderMain;
