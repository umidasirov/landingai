import { MapPin, Navigation } from "lucide-react";

export function LocationSection() {
  return (
    <section
      id="manzil"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(168,85,247,0.5) 2px, transparent 2px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sarlavha */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-400 mb-6">
            Manzil
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-white leading-tight">
            IT Haftaligiga tashrif buyuring{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Al-Xorazmiy maktabida, Toshkent
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Zamonaviy texnologiyalar bilan jihozlangan maktabda bir hafta davomida IT konkurslar va qiziqarli tadbirlar sizni kutmoqda.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chap taraf — rasm */}
          <div className="relative group w-full">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl opacity-20 blur-3xl group-hover:opacity-30 transition-opacity" />

            <div className="relative rounded-3xl overflow-hidden border-2 border-purple-500/30 backdrop-blur-sm w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[450px]">
              <img
                src="https://storage.kun.uz/source/5/s5qSCwSqNUg9DnCjhVAQE3XH72A58i-T.jpg"
                alt="Konferensiya markazi"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black/90 to-transparent backdrop-blur-sm">
                <h3 className="text-white text-xl sm:text-2xl mb-2 leading-tight">
                  Muhammad Al-Xorazmiy nomidagi ixtisoslashtirilgan maktab
                </h3>
                <p className="text-purple-400 text-sm sm:text-base">
                  1000+ ishtirokchi sig‘imi bilan zamonaviy jihozlar
                </p>
              </div>
            </div>
          </div>

          {/* O‘ng taraf */}
          <div className="space-y-6 w-full">
            {/* Manzil kartasi */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div className="text-sm sm:text-base">
                  <h4 className="text-white mb-2">Manzil</h4>
                  <p>
                    Mahtumquli ko‘chasi,<br />
                    100047, Toshkent, Yashnobod tumani,<br />
                    Maxtumquli ko‘chasi, 28-uy.
                  </p>
                </div>
              </div>
            </div>

            {/* Xarita */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-purple-500/30 backdrop-blur-sm h-64 sm:h-80 lg:h-96 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1498.6370638324217!2d69.31624253176832!3d41.302899763840294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5378726fbaf%3A0x2d84fd21efda8919!2sMuhammad%20al-Xorazmiy%20nomidagi%20ixtisoslashtirilgan%20maktab!5e0!3m2!1sru!2s!4v1763813441498!5m2!1sru!2s"
                loading="lazy"
                className="w-full h-full"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Yo'nalish tugmasi */}
            <a
              href="https://maps.app.goo.gl/5GH2QyXkXsta99QP6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full text-white flex items-center justify-center gap-2 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-shadow"
            >
              <Navigation size={20} />
              Yo‘lga tushish
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
