export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-5 text-center">
      <div className="absolute top-0 left-0 w-full h-1 "></div>

      <div className="container mx-auto px-6">
        <p className="text-sm md:text-base font-medium">
          © {new Date().getFullYear()}{""}
          <span className="text-white font-semibold">
            Bali Wisata Oke
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
