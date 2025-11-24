import { Link } from "react-router-dom";

export default function NormalCard({ item }) {
  return (
    <article
      className="group we relative rounded-3xl overflow-hidden shadow-2xl flex-none 
      w-full sm:w-80 md:w-72 lg:w-1/5 flex flex-col md:flex-row h-auto md:h-72 
      lg:h-80 xl:h-96 bg-gradient-to-br from-black/40 to-black/10 border 
      border-white/10 backdrop-blur-sm"
    >
      <div className="w-full md:w-1/2 h-52 md:h-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 
          group-hover:scale-105 group-hover:brightness-90"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center gap-2 p-6 sm:p-8 bg-black/50 backdrop-blur-md">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r 
          from-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          {item.title}
        </h3>

        <p className="text-gray-300 mt-3 mb-5 text-sm sm:text-base">
          {item.desc}
        </p>

        <div className="flex flex-wrap gap-3 mt-auto justify-center">
          <Link
            to={item.link}
            className="px-5 p-2 rounded-lg bg-purple-600 hover:bg-purple-500 
            mt-2 transition font-semibold"
          >
            Ro‘yxatdan o‘tish
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 rounded-3xl pointer-events-none border 
      border-purple-500/20 group-hover:border-purple-400/40 transition"
      />
    </article>
  );
}
