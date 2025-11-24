import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SponsorCarouselProps {
  logos: string[];
  speed?: number; // px per frame
}

export function SponsorCarousel({ logos, speed = 0.5 }: SponsorCarouselProps) {

  if (!logos.length) return null;

  return (
    <div className="w-full overflow-hidden bg-black py-8 fle" style={{marginTop:'30px'}}>
      <div className='flex justify-between items-center gap-8 animate-scroll' style={{ '--scroll-speed': `${speed}px`,margin:"34px 10px" } as React.CSSProperties }
      >
        {logos.map((logo, idx) => (
          <div key={idx} className="flex-none w-1/3 flex justify-center items-center">
            <ImageWithFallback src={logo} alt={`Sponsor ${idx}`} className="h-24 object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
