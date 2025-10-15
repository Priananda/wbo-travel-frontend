// app/fonts/fonts.ts
import localFont from "next/font/local";

export const hkGrotesk = localFont({
  src: [
    {
      path: "../../../public/fonts/HKGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/HKGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/HKGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-hkGrotesk",
  display: "swap",
});

export const LaBelleAurore = localFont({
  src: [
    {
      path: "../../../public/fonts/LaBelleAurore-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-LaBelleAurore",
  display: "swap",
});