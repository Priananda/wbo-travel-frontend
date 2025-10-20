import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/app/services/Auth";
// import Footer from "@/app/components/footer/index";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <AuthProvider>
            {children}
            {/* <Footer />  */}
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}


// import "./globals.css";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { AuthProvider } from "@/app/services/Auth";
// import Footer from "@/app/components/footer/index";
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         {/* 🔹 GoogleOAuthProvider harus membungkus AuthProvider */}
//         <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
//           <AuthProvider>{children}</AuthProvider>
//         </GoogleOAuthProvider>
//             <Footer />
//       </body>
//     </html>
//   );
// }


