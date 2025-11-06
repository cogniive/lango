"use client";

import Lottie from "lottie-react";
import mascotAnimation from "../../public/mascot-animation.json";

type LottieMascotProps = {
  width?: number;
  height?: number;
  className?: string;
};

const LottieMascot = ({ 
  width = 40, 
  height = 40,
  className = ""
}: LottieMascotProps) => {
  return (
    <div 
      className={className}
      style={{ 
        width: `${width}px`, 
        height: `${height}px` 
      }}
    >
      <Lottie 
        animationData={mascotAnimation}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default LottieMascot;

