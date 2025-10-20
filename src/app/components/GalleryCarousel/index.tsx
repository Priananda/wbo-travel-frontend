// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";

// interface Slide {
//   id: number;
//   image: string;
//   title: string;
//   description: string;
// }

// export default function Home() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [manualSlide, setManualSlide] = useState(false);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const slides: Slide[] = [
//     { id: 1, image: "https://picsum.photos/id/10/800/600", title: "Nature 1", description: "Nature first" },
//     { id: 2, image: "https://picsum.photos/id/11/800/600", title: "Nature 2", description: "Nature second" },
//     { id: 3, image: "https://picsum.photos/id/12/800/600", title: "Nature 3", description: "Nature 3th" },
//     { id: 4, image: "https://picsum.photos/id/13/800/600", title: "Nature 4", description: "Nature last" },
//     { id: 5, image: "https://picsum.photos/id/14/800/600", title: "Nature 5", description: "Nature 5th" },
//     { id: 6, image: "https://picsum.photos/id/15/800/600", title: "Nature 6", description: "Nature 6th" },
//   ];

//   const IMAGES_PER_SLIDE = 3;

//   const slidesPerGroup: Slide[][] = [];
//   for (let i = 0; i < slides.length; i += IMAGES_PER_SLIDE) {
//     slidesPerGroup.push(slides.slice(i, i + IMAGES_PER_SLIDE));
//   }
//   const totalSlides = slidesPerGroup.length;

//   // Fungsi untuk reset timer auto-slide setelah interaksi manual
//   const resetAutoSlide = () => {
//     setManualSlide(true);
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => {
//       setManualSlide(false); // kembalikan auto-slide setelah 5 detik
//     }, 5000);
//   };

//   // Auto-slide
//   useEffect(() => {
//     if (!manualSlide) {
//       intervalRef.current = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % totalSlides);
//       }, 5000);
//     }

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [manualSlide, totalSlides]);

//   const handleManualSlide = (newSlide: number) => {
//     resetAutoSlide();
//     setCurrentSlide(newSlide);
//   };

//   const next = () => handleManualSlide((currentSlide + 1) % totalSlides);
//   const prev = () => handleManualSlide((currentSlide - 1 + totalSlides) % totalSlides);

//   return (
//     <div
//       className="bg-gray-100 min-h-screen flex items-center justify-center"
//       onMouseEnter={resetAutoSlide} // pause auto-slide saat hover
//     >
//       <div className="container mx-auto px-4 py-12 relative">
//         {/* Carousel wrapper */}
//         <div className="relative overflow-hidden rounded-lg shadow-xl bg-white group">
//           <div
//             className="flex transition-transform duration-700 ease-in-out"
//             style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//           >
//             {slidesPerGroup.map((group, index) => (
//               <div key={index} className="flex w-full flex-shrink-0">
//                 {group.map((slide) => (
//                   <div key={slide.id} className="w-1/3 px-2 py-4">
//                     <div className="rounded-lg overflow-hidden shadow-md h-full relative">
//                       <div className="bg-gray-200 h-48 md:h-64 flex items-center justify-center relative">
//                         <Image
//                           src={slide.image}
//                           alt={slide.title}
//                           width={800}
//                           height={600}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div className="p-4">
//                         <h3 className="text-xl font-semibold">{slide.title}</h3>
//                         <p className="text-gray-600 mt-2">{slide.description}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>

//           {/* Prev */}
//           <button
//             onClick={prev}
//             className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>

//           {/* Next */}
//           <button
//             onClick={next}
//             className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>

//         {/* Dots */}
//         <div className="flex justify-center mt-4 space-x-2">
//           {slidesPerGroup.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handleManualSlide(index)}
//               className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentSlide === index ? "bg-blue-600" : "bg-gray-300"}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
