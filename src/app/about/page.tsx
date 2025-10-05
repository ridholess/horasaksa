import Navigation from '@/components/Navigation'
import Footer from '@/components/sections/Footer'
import Image from 'next/image'

export default function About() {
  return (
    <div>
      <Navigation />

      {/* About Section */}
      <section className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 xl:px-30 py-16 md:py-20 lg:py-28 bg-slate-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center min-h-screen">
          {/* Left Side - Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-tight">
                <span className="text-primary font-bold">Tentang</span>
                <br />
                Horas Aksa
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Platform pembelajaran aksara Batak yang interaktif dan modern,
                dirancang untuk melestarikan warisan budaya leluhur bangsa
                Batak.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">Misi Kami</h2>
                <p className="text-slate-600 leading-relaxed">
                  Menjembatani tradisi dan teknologi modern untuk memastikan
                  aksara Batak tetap hidup dan dapat dipelajari oleh generasi
                  masa kini. Kami percaya bahwa setiap orang berhak mengenal dan
                  mempelajari warisan budaya yang luhur ini.
                </p>
              </div>

              <div className="space-y-3 md:space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  Fitur Unggulan
                </h2>
                <ul className="space-y-2 md:space-y-3 text-slate-600">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Pembelajaran interaktif dengan teknologi AI untuk
                      pengenalan tulisan aksara
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Konverter nama ke aksara Batak secara real-time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Eksplorasi sejarah dan perkembangan aksara Batak
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Latihan menulis dengan feedback langsung dari AI
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 md:space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">Visi</h2>
                <p className="text-slate-600 leading-relaxed">
                  Menjadi platform pembelajaran terdepan untuk aksara Batak yang
                  dapat diakses oleh siapa saja, di mana saja. Kami bermimpi
                  suatu hari nanti setiap orang Batak dapat dengan bangga
                  menulis namanya dalam aksara leluhur mereka.
                </p>
              </div>

              <div className="space-y-3 md:space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  Komitmen Pelestarian
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Kami berkomitmen untuk terus mengembangkan dan menyempurnakan
                  platform ini sebagai bentuk dedikasi terhadap pelestarian
                  budaya Batak. Setiap fitur yang kami kembangkan selalu
                  mempertimbangkan keaslian dan akurasi aksara Batak
                  tradisional.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Logo and Visual Elements */}
          <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8 mt-8 lg:mt-0">
            <div className="relative">
              {/* Main Logo/Symbol */}
              <div className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center border border-primary/20">
                <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 bg-white rounded-full shadow-2xl flex items-center justify-center">
                  <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-primary">
                    <svg
                      className="text-primary"
                      width="100%"
                      height="100%"
                      viewBox="0 0 34 26"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        transform="matrix(1,0,0,1,-3296.46,-2540.75)"
                        fill="currentColor"
                      >
                        <g transform="matrix(1.41864,0,0,1,0,0)">
                          <g transform="matrix(0.704901,0,0,1,378.063,1247.56)">
                            <path d="M2770.81,1318.57C2769.69,1318.79 2768.6,1318.06 2768.37,1316.94C2768.15,1315.82 2768.87,1314.73 2769.99,1314.51C2772.08,1314.28 2774.14,1314.19 2776.24,1314.37C2778.26,1314.54 2780.27,1314.9 2782.32,1315.56C2782.86,1315.68 2783.19,1316.22 2783.07,1316.76C2782.95,1317.29 2782.41,1317.63 2781.88,1317.51C2779.94,1317.25 2778.09,1317.26 2776.26,1317.44C2774.39,1317.62 2772.6,1318.04 2770.81,1318.57Z" />
                          </g>
                          <g transform="matrix(0.704901,0,0,1,378.063,1247.56)">
                            <path d="M2768.71,1309.97C2767.59,1310.2 2766.5,1309.48 2766.27,1308.36C2766.04,1307.24 2766.76,1306.14 2767.88,1305.92C2771.12,1305.45 2774.23,1305.26 2777.24,1305.48C2780.45,1305.7 2783.5,1306.34 2786.37,1307.55C2786.89,1307.73 2787.17,1308.31 2786.98,1308.83C2786.8,1309.34 2786.23,1309.62 2785.71,1309.43C2782.97,1308.65 2780.14,1308.4 2777.2,1308.54C2774.44,1308.68 2771.61,1309.2 2768.71,1309.97Z" />
                          </g>
                          <g transform="matrix(0.704901,0,0,1,378.063,1247.56)">
                            <path d="M2763.23,1300.76C2762.24,1301.33 2760.97,1300.99 2760.41,1299.99C2759.84,1299 2760.18,1297.74 2761.17,1297.17C2766.66,1294.26 2772.07,1293.01 2777.45,1293.21C2782.77,1293.41 2788.04,1294.98 2793.27,1297.74C2793.76,1297.98 2793.97,1298.58 2793.73,1299.07C2793.49,1299.57 2792.89,1299.77 2792.39,1299.53C2787.37,1297.3 2782.39,1296.13 2777.44,1296.28C2772.65,1296.42 2767.93,1297.86 2763.23,1300.76Z" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center">
                {/* <span className="text-2xl text-primary font-bold">ᯅ</span> */}
                <svg
                  className="text-primary"
                  width="238"
                  height="94"
                  viewBox="0 0 238 94"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M88.369 21.5737C78.9194 17.1086 67.6664 15.5199 55.5538 16.5503C42.2815 17.7095 28.0642 22.2173 13.6322 29.7306C9.20811 31.8344 3.92496 29.9024 1.82029 25.4802C-0.241422 21.0152 1.64848 15.7343 6.11553 13.6306C27.1193 4.91509 47.4357 1.4375 65.1321 3.45537C77.6312 4.87218 88.8413 8.77925 97.9473 15.391C120.154 2.21043 138.537 -1.05262 151.466 1.86686C164.652 4.78633 173.157 13.4161 175.82 25.094C179.6 41.7522 170.751 65.9237 142.918 86.2312C140.814 87.7768 137.808 87.3905 136.219 85.2868C134.629 83.183 135.059 80.1774 137.163 78.5889C155.59 64.2062 164.395 48.493 165.082 35.57C165.641 24.7937 159.67 16.4215 148.889 14.4036C139.483 12.6433 127.112 15.3482 112.337 23.5485C92.4068 34.6253 68.7824 55.7484 43.011 90.4815C40.0043 94.3455 34.4209 95.0754 30.5552 92.113C26.6465 89.1077 25.9168 83.5267 28.9235 79.6198C50.3138 52.7864 70.4149 34.0244 88.369 21.5737ZM203.009 62.1456L191.928 52.0993C188.706 48.45 189.007 42.8255 192.701 39.5625C196.394 36.2996 201.978 36.6433 205.242 40.3356L212.888 51.0689L223.068 39.6915C226.676 36.3427 232.303 36.6002 235.61 40.2067C238.96 43.8131 238.703 49.4376 235.095 52.7864L221.349 63.047L227.019 71.0331C228.738 73.008 228.566 76.0131 226.591 77.7734C224.658 79.4907 221.608 79.3191 219.89 77.3442L211.9 70.1311L201.85 77.6875C199.874 79.4907 196.867 79.3621 195.106 77.4301C193.302 75.4981 193.431 72.4496 195.364 70.6893L203.009 62.1456Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  className="text-primary"
                  width="184"
                  height="93"
                  viewBox="0 0 184 93"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.99764 65.0717C4.31706 69.365 9.68526 71.0393 14.0235 68.7209C41.1264 53.6942 67.5853 46.3528 93.6574 45.8806C118.097 45.4512 142.108 50.9898 165.775 61.5944L131.413 83.5333C129.179 84.9072 128.493 87.8262 129.867 90.0587C131.241 92.3342 134.161 93.0216 136.395 91.6478L180.421 65.7158C182.182 64.6425 183.214 62.7532 183.171 60.6924C183.085 58.6316 181.925 56.7854 180.121 55.8409C152.073 40.3849 123.295 31.8842 93.6574 31.3261C65.1799 30.7679 35.8865 37.68 5.69093 53.0501C1.35274 55.3256 -0.278842 60.7354 1.99764 65.0717Z"
                    fill="currentColor"
                  />
                  <path
                    d="M1.22374 19.4334C2.38345 24.199 7.19412 27.1616 11.9618 26.0024C39.4514 18.6178 66.6833 14.7539 93.7004 14.2816C121.448 13.7664 148.98 16.7289 176.298 22.9543C178.832 23.5983 181.452 22.0524 182.097 19.5194C182.741 16.9434 181.195 14.3675 178.617 13.7235C150.741 5.90958 122.479 1.48722 93.7864 0.628554C65.5237 -0.273048 36.8743 2.38885 7.75258 8.70006C2.98486 9.85926 0.0640251 14.6678 1.22374 19.4334Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="absolute top-1/2 -left-6 sm:-left-8 w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  className="text-primary"
                  width="183"
                  height="99"
                  viewBox="0 0 183 99"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M51.773 17.2581C62.3393 18.9325 72.1327 22.0236 81.0238 26.7892C58.8174 39.8409 42.1087 56.6279 30.2538 76.7208C28.6216 79.3827 29.3523 82.8172 31.8435 84.6204C38.2864 89.0425 45.8462 92.5202 54.5655 94.9245C64.7882 97.7152 76.6853 99.0462 90.3441 98.7457C93.0072 98.7457 95.1123 96.642 95.1123 93.9801C95.1123 91.3612 92.9642 89.2146 90.3441 89.2575C80.0785 89.0429 70.9301 87.9265 62.8551 85.9086C55.5102 84.1054 49.1103 81.5292 43.5265 78.2233C55.639 61.2217 71.9181 47.3543 93.0077 37.0074C111.95 27.7337 134.758 21.3365 161.775 18.0306C166.671 17.3436 170.021 12.8358 169.334 7.9843C168.647 3.13282 164.137 -0.25896 159.283 0.427975C132.824 4.76425 110.317 11.7198 91.375 21.1652C80.6369 13.0078 68.3102 7.38344 54.4795 3.90584C40.52 0.385293 25.0569 -0.645361 8.09073 0.427975C3.19416 0.943177 -0.328306 5.36545 0.230075 10.2169C0.788456 15.1113 5.16981 18.6317 10.0664 18.0736C25.0997 15.7122 39.0161 15.3261 51.773 17.2581Z"
                    fill="currentColor"
                  />
                  <path
                    d="M133.512 44.821C130.032 48.2557 130.032 53.9231 133.512 57.3578L174.703 92.6919C176.55 94.538 179.556 94.538 181.446 92.6919C183.293 90.8458 183.293 87.8406 181.446 85.9516L146.096 44.821C142.617 41.3434 136.991 41.3434 133.512 44.821Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-xs sm:max-w-sm">
              <div className="bg-white p-3 md:p-4 rounded-lg shadow-lg border border-gray-100">
                <div className="text-xl md:text-2xl font-bold text-primary mb-1">19</div>
                <div className="text-xs md:text-sm text-gray-600">Aksara Dasar</div>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-lg shadow-lg border border-gray-100">
                <div className="text-xl md:text-2xl font-bold text-primary mb-1">5</div>
                <div className="text-xs md:text-sm text-gray-600">Jenis Vokal</div>
              </div>
            </div>

            {/* Brand Statement */}
            <div className="text-center space-y-1 md:space-y-2">
              <h3 className="text-lg md:text-xl font-bold text-slate-800">
                Horas Aksa
              </h3>
              <p className="text-slate-500 text-xs md:text-sm">
                Melestarikan Warisan, Merangkul Teknologi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contributor Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              <span className="text-primary">Kontributor</span> Utama
            </h2>
            <p className="text-lg md:text-xl text-slate-300">
              Dikembangkan dengan dedikasi untuk melestarikan warisan budaya
              Batak
            </p>
          </div>

          {/* Contributors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Contributor 1 - Alie Pratama */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-4 sm:p-6 rounded-2xl shadow-xl border border-slate-600">
              <div className="flex flex-row items-start gap-4">
                {/* Profile Photo */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shadow-lg ring-2 ring-slate-500">
                    <Image
                      src="/profile-1.webp"
                      alt="Alie Pratama"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        Alie Pratama
                      </h3>
                      <div className="w-5 h-4 rounded-sm bg-red-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🇮🇩</span>
                      </div>
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm">
                      Mahasiswa di{' '}
                      <span className="text-primary font-semibold">
                        Universitas Teknologi Yogyakarta
                      </span>
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-slate-200">
                      Kontribusi:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-1 bg-slate-600 text-slate-200 rounded-md text-xs font-medium">
                        Frontend Development
                      </span>
                      <span className="px-2 py-1 bg-slate-600 text-slate-200 rounded-md text-xs font-medium">
                        AI Development
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href="mailto:zakki@example.com"
                      className="flex-1 bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-lg text-xs font-medium text-center transition-colors"
                    >
                      Kontak
                    </a>
                    <div className="flex gap-1.5">
                      {/* GitHub */}
                      <a
                        href="https://github.com/aliepratama"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-slate-200"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>

                      {/* LinkedIn */}
                      <a
                        href="https://linkedin.com/in/aliepratama"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>

                      {/* Instagram */}
                      <a
                        href="https://instagram.com/aliepratama_"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contributor 2 - Ridho Ardiansyah */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-4 sm:p-6 rounded-2xl shadow-xl border border-slate-600">
              <div className="flex flex-row items-start gap-4">
                {/* Profile Photo */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shadow-lg ring-2 ring-slate-500">
                    <Image
                      src="/profile-2.webp"
                      alt="Ridho Ardiansyah"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        Ridho Ardiansyah
                      </h3>
                      <div className="w-5 h-4 rounded-sm bg-red-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🇮🇩</span>
                      </div>
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm">
                      Mahasiswa di{' '}
                      <span className="text-primary font-semibold">
                        Universitas Teknologi Yogyakarta
                      </span>
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-slate-200">
                      Kontribusi:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-1 bg-slate-600 text-slate-200 rounded-md text-xs font-medium">
                        UI Design
                      </span>
                      <span className="px-2 py-1 bg-slate-600 text-slate-200 rounded-md text-xs font-medium">
                        UX Research
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                   <a
                      href="mailto:zakki@example.com"
                      className="flex-1 bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-lg text-xs font-medium text-center transition-colors"
                    >
                      Kontak
                    </a>
                    <div className="flex gap-1.5">
                      {/* GitHub */}
                      <a
                        href="https://github.com/ridholess"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-slate-200"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>

                      {/* LinkedIn */}
                      <a
                        href="https://linkedin.com/in/ridholess"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>

                      {/* Instagram */}
                      <a
                        href="https://instagram.com/ridholess"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contributor 3 - Zakki Farian - Centered on desktop */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-4 sm:p-6 rounded-2xl shadow-xl border border-slate-600 md:col-span-2 md:max-w-md md:mx-auto md:w-full">
              <div className="flex flex-row items-start gap-4">
                {/* Profile Photo */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shadow-lg ring-2 ring-slate-500">
                    <Image
                      src="/profile-3.webp"
                      alt="Zakki Farian"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        Zakki Farian
                      </h3>
                      <div className="w-5 h-4 rounded-sm bg-red-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🇮🇩</span>
                      </div>
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm">
                      Mahasiswa di{' '}
                      <span className="text-primary font-semibold">
                        Universitas Teknologi Yogyakarta
                      </span>
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-slate-200">
                      Kontribusi:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-1 bg-slate-600 text-slate-200 rounded-md text-xs font-medium">
                        AI Development
                      </span>
                      <span className="px-2 py-1 bg-slate-600 text-slate-200 rounded-md text-xs font-medium">
                        UX Research
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href="mailto:zakki@example.com"
                      className="flex-1 bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-lg text-xs font-medium text-center transition-colors"
                    >
                      Kontak
                    </a>
                    <div className="flex gap-1.5">
                      {/* GitHub */}
                      <a
                        href="https://github.com/ZeckRyan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-slate-200"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>

                      {/* LinkedIn */}
                      <a
                        href="https://linkedin.com/in/zakki-farian-5272b6247"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>

                      {/* Instagram */}
                      <a
                        href="https://instagram.com/zakkfrian"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
