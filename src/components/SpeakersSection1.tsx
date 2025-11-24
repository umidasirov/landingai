import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { ImageWithFallback } from "./figma/ImageWithFallback";

export function SpeakersSection() {
  const speakers = [
    {
      name: "Chiroq",
      desk: "TechCorp AI",
      image:
        "https://www.kidzmartpk.com/cdn/shop/files/01_dba7b0ae-0da5-4b0a-8a93-e87b0935a141.jpg?v=1726064188",
    },
    {
      name: "Kubik Rubik",
      desk: "Kubik Rubik buyicha mutaxassis",
      image:
        "https://masterpiecer-images.s3.yandex.net/6d36710a597a11eebf203abd0be4d755:upscaled",
    },
    {
      name: "Kompmnyuterda tez yozish san'ati",
      desk: "Kpomputer",
      image:
        "https://static.tildacdn.com/tild6632-3637-4837-b536-306537343439/sincerely-media-oTca.jpg",
    },
    {
      name: "PES2021",
      desk: "playstation",
      image:
        "https://www.gamezonecentarshop.com/wp-content/uploads/2024/03/EFootball-pes-2021-season-update-ps4-cena-prodaja-srbija-gamezonecentarshop.jpg",
    },
    {
      name: "Laberint",
      desk: "harward  ",
      image:
        "https://www.lafueliki.de/media/image/97/e9/4c/Magnetisches-Holz-Labyrinth-feinmotorik-laf-liki.jpg",
    },
    {
      name: "Blur",
      desk: "PlayStation",
      image: "https://cdn.mobygames.com/36ac7700-abb0-11ed-be6f-02420a000197.webp",
    },
    {
      name: "Mortal Kombat 11",
      desk: "PlayStation",
      image: "https://i.playground.ru/e/xsckyfAgFKCtpHbuMZZwzg.jpeg",
    },
    {
      name: "VR ning eng zo'r o'yinlari",
      desk: "VR",
      image:
        "https://blog.vive.com/express_media/images/BestFreeVRGamesThumb.scale-100.png",
    },
    {
      name: "Dron simulyator",
      desk: "Drone",
      image:
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1278060/ss_859cebd8d0082d9d8befde40073de3f1f3f979fc.1920x1080.jpg?t=1762421410",
    },
  ];

  const speed = 2500;

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-600 rounded-full filter blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-400 mb-6">
           O'yinlar
          </div>
          <h2 className="text-4xl lg:text-5xl text-white">
            It haftalikdagi{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              kòngilochar òyinlar
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            It haftalikdagi kòngilo'char yinlar
          </p>
        </div>

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
          {speakers.map((speaker, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center bg-white/5 rounded-lg p-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Glow border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />

                {/* CARD */}
                <div className="relative bg-gradient-to-b from-gray-900 to-black border border-purple-500/30 rounded-2xl overflow-hidden backdrop-blur-sm group-hover:border-purple-500/60 transition-all">
                  {/* IMAGE */}
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                    {/* Social buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 bg-purple-600/80 backdrop-blur-sm rounded-full flex items-center justify-center"
                      >
                        <Linkedin size={16} className="text-white" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 bg-cyan-600/80 backdrop-blur-sm rounded-full flex items-center justify-center"
                      >
                        <Twitter size={16} className="text-white" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-white mb-1">{speaker.name}</h3>
                    <p className="text-gray-500 text-sm">{speaker.ddesk}</p>
                  </div>

                  {/* Soft glow */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
                  />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
