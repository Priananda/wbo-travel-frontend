"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import bgYear from "@/app/assets/images/bg-year.jpeg";
import compas from "@/app/assets/images/compas.svg";
import plane from "@/app/assets/images/plane.svg";
import medali from "@/app/assets/images/medali.svg";
import security from "@/app/assets/images/security.svg";
import { hkGrotesk } from "@/app/fonts/fonts";
import { LaBelleAurore } from "@/app/fonts/fonts";
import AOS from "aos";
import "aos/dist/aos.css";
import WhatsAppButton from "@/app/components/waButton/page";
import Footer from "@/app/components/footer";
import ContactUsButton from "@/app/components/contactUsButton/page";
export default function HomePage() {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();

  // ✅ Inisialisasi AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  useEffect(() => {
    if (inView) {
      controlsLeft.start({ opacity: 1, x: 0, transition: { duration: 0.6 } });
      controlsRight.start({ opacity: 1, x: 0, transition: { duration: 0.6 } });

      let start = 0;
      const end = 10;
      const step = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(step);
      }, 100);
    }
  }, [inView, controlsLeft, controlsRight]);

  // 🔹 Data untuk 3 langkah
  const steps = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 21V8a2 2 0 012-2h2a2 2 0 012 2v13M5 21h14M10 11h4"
          />
        </svg>
      ),
      bgColor: "bg-red-100",
      title: "Beritahu Kami Yang Ingin Kamu Lakukan",
      desc: "Kami akan menjadikan ini sebagai referensi tepat untuk memilih aktivitas terbaik untuk kamu.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13h2l1 9h12l1-9h2M5 13l1-9h12l1 9M9 5V3h6v2"
          />
        </svg>
      ),
      bgColor: "bg-blue-100",
      title: "Beritahu Kami Preferensi Wisata-mu",
      desc: "Beritahu kami preferensi wisata kamu, kami akan carikan destinasi yang tepat untuk liburan ke Bali.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 17l-3.5 2.1 1-4.2L6 11.9l4.3-.4L12 8l1.7 3.5 4.3.4-3.5 3 1 4.2z"
          />
        </svg>
      ),
      bgColor: "bg-green-100",
      title: "Kami Akan Berikan Rekomendasi Wisata",
      desc: "Kami akan berikan rekomendasi paket liburan di Bali yang sesuai dengan yang kamu mau!",
    },
  ];

  return (
    <>
      {/* ====================== SECTION ABOUT ====================== */}
      <section>
      <div        ref={ref}
        className="w-full mt-20 md:mt-20 lg:mt-20 mb-10 bg-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        {/* Judul */}
        <div className="container mx-auto space-y-4 px-4 md:px-0 lg:px-12 mt-20 text-left">
          <Image
            src={compas}
            alt="Compass Icon"
            className="w-20 h-20 md:w-36 md:h-36 lg:w-36 lg:h-36"
          />

          <p
            className={`text-teal-600 text-2xl font-medium ${LaBelleAurore.className}`}
          >
            Selamat Datang Di
          </p>

          <h2
            className={`text-3xl md:text-4xl font-semibold text-black drop-shadow-sm ${hkGrotesk.className}`}
          >
            PT Bali Sundaram Travel
          </h2>
        </div>

        {/* GRID KONTEN */}
        <div
          className={`container mx-auto px-4 md:px-0 lg:px-12 grid md:grid-cols-2 gap-20 items-center font-medium ${hkGrotesk.className}`}
        >
          {/* Kolom Kiri */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controlsLeft}
            className="space-y-8"
          >
            <p className="mt-5 text-gray-800 text-md leading-relaxed lg:text-justify">
              Merupakan perusahaan pelayanan jasa tour dan travel di Bali yang
              telah berpengalaman lebih dari 10 tahun dengan layanan terbaik
              dari tim profesional PT Bali Sundaram Travel.
            </p>

            <p className="text-gray-800 text-md leading-relaxed lg:text-justify">
              PT Bali Sundaram Travel merupakan perusahaan resmi yang berlokasi
              di Bali tepatnya JL. Pudak No 3A Batubulan, Kec. Sukawati, Kab.
              Gianyar, Bali 80582.
            </p>

            {/* Keunggulan */}
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Image
                  src={medali}
                  alt="Medali Icon"
                  className="w-12 h-12 md:w-20 md:h-20 lg:w-20 lg:h-20"
                />

                <div>
                  <h3 className="font-semibold text-teal-600 text-lg">
                    Jaminan Liburan Menyenangkan
                  </h3>
                  <p className="text-gray-800 leading-snug mt-1">
                    Kami yakin liburan anda di Bali akan memorable dan
                    menyenangkan.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Image
                  src={security}
                  alt="Security Icon"
                  className="w-10 h-10 md:w-20 md:h-20"
                />
                <div>
                  <h3 className="font-semibold text-teal-600 text-lg">
                    Pilihan Destinasi Terbaik
                  </h3>
                  <p className="text-gray-800 leading-snug mt-1">
                    Kami memilih destinasi terbaik untuk anda.
                  </p>
                </div>
              </div>
            </div>

            {/* <button
  onClick={() =>
    window.open(
      "https://wa.me/6281338905757?text=Halo%20Bali%20Sundaram%20Travel!%20Ada%20yang%20bisa%20kami%20bantu?",
      "_blank"
    )
  }
  className="bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm text-white font-semibold px-6 py-3 cursor-pointer transition-all"
>
  Contact Us
</button> */}
<ContactUsButton />

          </motion.div>

          {/* Kolom Kanan */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controlsRight}
            className="relative -mt-5 md:-mt-80 lg:-mt-80 flex justify-center"
          >
            {/* Gambar Pantai */}
            <div className="relative w-full h-[420px] md:h-[600px] rounded-lg shadow-lg overflow-hidden">
              <Image
                src={bgYear}
                alt="Pantai Bali"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Badge Tahun */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              className="absolute left-10 top-10 md:-left-4 md:top-14 lg:-left-10 lg:top-14 bg-teal-600 text-white px-8 py-8 rounded-lg shadow-lg text-center w-48"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={plane}
                  alt="Plane Icon"
                  className="w-10 h-10 md:w-20 md:h-20"
                />
                <span className="text-5xl font-bold">{count}</span>
                <p className="text-md font-medium mt-2">Tahun Pengalaman</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ====================== SECTION 3 LANGKAH ====================== */}
      <section className="w-full bg-white text-center">
        {/* Subtitle */}
        <p
          className={`text-teal-600 text-2xl mb-2 ${LaBelleAurore.className}`}
        >
          3 Langkah Liburan Menyenangkan
        </p>

        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl font-semibold text-black mb-12 drop-shadow-sm ${hkGrotesk.className}`}
        >
          Temukan Liburan Sempurna <br /> Bersama Kami
        </h2>

        {/* Cards (pakai AOS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto px-4 md:px-7 lg:px-7">
          {steps.map((step, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className="bg-white shadow-md rounded-xl p-8 border border-slate-200 hover:bg-teal-50/50 transition duration-300"
            >
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center ${step.bgColor}`}
              >
                {step.icon}
              </div>

              <h3 className="font-semibold text-xl mb-5 text-teal-700">
                {step.title}
              </h3>

              <p className="text-gray-800 text-md ">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
         <WhatsAppButton />
      
      </section>
         <Footer/>
      </section>
    </>
  );
}



























// "use client";

// import { motion, useAnimation } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Navbar from "@/app/components/navbar";
// import bgYear from "@/app/assets/images/bg-year.jpeg";
// import compas from "@/app/assets/images/compas.svg";
// import plane from "@/app/assets/images/plane.svg";
// import medali from "@/app/assets/images/medali.svg";
// import security from "@/app/assets/images/security.svg";
// import { hkGrotesk } from "@/app/fonts/fonts"
// import { LaBelleAurore } from "@/app/fonts/fonts"


// export default function AboutSection() {
//   const [count, setCount] = useState(0);
//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
//   const controlsLeft = useAnimation();
//   const controlsRight = useAnimation();

//   useEffect(() => {
//     if (inView) {
//       controlsLeft.start({ opacity: 1, x: 0, transition: { duration: 0.6 } });
//       controlsRight.start({ opacity: 1, x: 0, transition: { duration: 0.6 } });

//       let start = 0;
//       const end = 10;
//       const step = setInterval(() => {
//         start += 1;
//         setCount(start);
//         if (start === end) clearInterval(step);
//       }, 100);
//     }
//   }, [inView, controlsLeft, controlsRight]);

//   return (
//     <section ref={ref} className="w-full mt-20 md:mt-20 lg:mt-20 mb-10 bg-white relative overflow-hidden">
//       {/* Navbar */}
//       <div className="absolute top-0 left-0 w-full z-50">
//         <Navbar />
//       </div>

//       {/* Judul */}
//       <div className="container mx-auto space-y-4 px-6 md:px-0 lg:px-12 mt-20 text-left">
//   <Image 
//     src={compas} 
//     alt="Compass Icon" 
//     className="w-20 h-20 md:w-36  md:h-36 lg:w-36  lg:h-36" 
//   />

//   <p className={`text-teal-600 text-2xl font-medium ${LaBelleAurore.className}`}>
//     Selamat Datang Di
//   </p>

//   <h2 className={`text-3xl md:text-4xl font-semibold text-black ${hkGrotesk.className}`}>
//     PT Bali Sundaram Travel
//   </h2>
// </div>


//       {/* GRID KONTEN */}
//       <div className={`container mx-auto px-6 md:px-0 lg:px-12 grid md:grid-cols-2 gap-20 items-center font-medium ${hkGrotesk.className}`}>
//         {/* Kolom Kiri */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={controlsLeft}
//           className="space-y-8"
//         >
//           <p className="mt-5 text-gray-800 text-md leading-relaxed lg:text-justify">
//             Merupakan perusahaan pelayanan jasa tour dan travel di Bali yang telah
//             berpengalaman lebih dari 10 tahun dengan layanan terbaik dari tim
//             profesional PT Bali Sundaram Travel.
//           </p>

//           <p className="text-gray-800 text-md leading-relaxed lg:text-justify">
//             PT Bali Sundaram Travel merupakan perusahaan resmi yang berlokasi di
//             Bali tepatnya JL. Pudak No 3A Batubulan, Kec. Sukawati, Kab. Gianyar,
//             Bali 80582.
//           </p>

//           {/* Keunggulan */}
//           <div className="space-y-5">
//             <div className="flex items-center gap-4">
//               <Image 
//     src={medali} 
//     alt="Medali Icon" 
//     className="w-12 h-12 md:w-20 md:h-20  lg:w-20 lg:h-20" 
//   />

//               <div>
//                 <h3 className="font-semibold text-teal-600 text-lg">
//                   Jaminan Liburan Menyenangkan
//                 </h3>
//                 <p className="text-gray-800 leading-snug mt-1">
//                   Kami yakin liburan anda di Bali akan memorable dan menyenangkan.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//                    <Image 
//     src={security} 
//     alt="Security Icon" 
//     className="w-10 h-10 md:w-20  md:h-20" 
//   />
//               <div>
//                 <h3 className="font-semibold text-teal-600 text-lg">
//                   Pilihan Destinasi Terbaik
//                 </h3>
//                 <p className="text-gray-800 leading-snug mt-1">
//                   Kami memilih destinasi terbaik untuk anda.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <button className="bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm text-white font-semibold px-6 py-3 cursor-pointer">
//             Contact Us
//           </button>
//         </motion.div>

//         {/* Kolom Kanan */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={controlsRight}
//           className="relative -mt-5 md:-mt-80 lg:-mt-80 flex justify-center"
//         >
//           {/* Gambar Pantai */}
//           <div className="relative w-full h-[420px] md:h-[600px] rounded-lg shadow-lg overflow-hidden">
//             <Image
//               src={bgYear}
//               alt="Pantai Bali"
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>

//           {/* Badge Tahun */}
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={inView ? { scale: 1, opacity: 1 } : {}}
//             transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
//             className="absolute left-10 top-10 md:-left-4 md:top-14 lg:-left-10 lg:top-14 bg-teal-600 text-white px-8 py-8 rounded-lg shadow-lg text-center w-48"
//           >
//             <div className="flex flex-col items-center">
//               <Image 
//     src={plane} 
//     alt="Compass Icon" 
//     className="w-10 h-10 md:w-20  md:h-20" 
//   />
//               <span className="text-5xl font-bold">{count}</span>
//               <p className="text-md font-medium mt-2">Tahun Pengalaman</p>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }





