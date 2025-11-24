import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Autoplay } from 'swiper/modules';

interface SponsorCarouselProps {
  logos: string[];
  speed?: number; // autoplay delay ms
}

export function SponsorCarousel({ logos, speed = 3000 }: SponsorCarouselProps) {
  if (!logos.length) return null;

  return (
    <div className="relative w-full mt-8 mb-8 relative rounded-xl overflow-hidden
                    p-4 sm:p-6 md:p-8
                    bg-gray-100
                    border border-purple-500/20
                    backdrop-blur-sm sm:backdrop-blur-md md:backdrop-blur-lg" style={{zIndex:12}}>
      
      {/* Optional light overlay (transparent) */}
      <div className="absolute inset-0 bg-transparent rounded-xl"></div>
<div className="absolute -inset-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-500 rounded-3xl opacity-50 blur-3xl transition-opacity"></div>

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        loop={true}
        modules={[Autoplay]}
        autoplay={{ delay: speed, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 28 },
        }}
      >
        {logos.map((logo, idx) => (
          <SwiperSlide key={idx} className="flex justify-center items-center bg-white/5 rounded-lg p-4">
            <img
              src={logo}
              alt={`Sponsor ${idx}`}
              className="h-20 sm:h-20 md:h-24 lg:h-28 object-containw"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
