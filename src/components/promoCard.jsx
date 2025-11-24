export function PromoCard({ item }) {
  return (
    <div
      className="
        w-full mx-auto relative rounded-3xl
        p-10 sm:p-14
        bg-gradient-to-br from-[#0a0a0f] via-[#1a1a22] to-[#000000]
        border border-white/10
        shadow-[0_0_40px_rgba(255,255,255,0.15)]
        overflow-hidden
        hover:shadow-[0_0_70px_rgba(115,70,255,0.8)]
        transition-all duration-500
      "
    >
      {/* Glow effekt */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-purple-500/30 blur-[120px] -top-20 -left-20"></div>
        <div className="absolute w-72 h-72 bg-pink-500/30 blur-[120px] bottom-0 right-0"></div>
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:38px_38px]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        <img
          src={item.image}
          alt={item.title}
          className="w-52 sm:w-64 lg:w-72 drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] hover:scale-110 transition-all duration-500"
        />

        <div className="text-center max-w-xl">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-6">
            {item.title}
          </h2>

          <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
            {item.desc}
          </p>

          <button
            className="
              mt-8 px-10 py-3 rounded-full text-lg font-semibold 
              bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]
              hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white
              hover:shadow-[0_0_35px_rgba(255,0,255,0.6)]
              transition-all duration-500
            "
          >
            Batafsil →
          </button>
        </div>
      </div>
    </div>
  );
}
