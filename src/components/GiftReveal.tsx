import { motion } from "framer-motion";

interface Gift {
  type: string;
  description: string;
  image: string;
  count: number;
}

export function SuspendedGiftBox({ gifts }: { gifts: Gift[] }) {
  const boxSize = 100;

  return (
    <div className="relative w-[500px] h-[500px] mx-auto mt-10">
      {/* Futuristic cyber box */}
      <div className="absolute top-[50%] left-[50%] w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2 bg-black/70 border-4 border-cyan-400 rounded-lg shadow-xl flex items-center justify-center">
        <span className="text-white font-bold">BOX</span>
      </div>

      {/* Gifts */}
      {gifts.map((gift, idx) => {
        const angle = (idx / gifts.length) * Math.PI * 2;
        const radius = 180;

        // X va Y joylashuvi radius asosida
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={gift.type + idx}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, x, y }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.3 }}
            className="absolute top-[50%] left-[50%] flex flex-col items-center"
          >
            {/* Sim */}
            <div
              className="absolute top-[-50%] w-[2px] h-[50%] bg-gray-500"
              style={{ transform: `rotate(${angle}rad)` }}
            />

            {/* Gift image */}
            <div className="relative">
              <img
                src={gift.image}
                className="w-16 h-16 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_#0ff] object-cover"
              />
              {/* Count */}
              <span className="absolute -bottom-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {gift.count}
              </span>
            </div>

            {/* Description */}
            <p className="text-white text-sm mt-1">{gift.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
