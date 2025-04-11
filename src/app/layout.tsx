// src/app/layout.tsx
import type { Metadata } from "next";
import { Noto_Sans, Tajawal } from "next/font/google"; // Import chosen fonts
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils"; // Utility for class names
import "@/styles/globals.css"; // Import global styles


// Configure Fonts
const notoSans = Noto_Sans({ // Renamed variable for clarity
  subsets: ["latin"],
  variable: "--font-sans",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
    title: "متطوعو الحرمين | Haramain Volunteers",
    description: "منصة متطوعي رئاسة الشؤون الدينية بالمسجد الحرام والمسجد النبوي | Volunteer platform for the Presidency of Religious Affairs at the Grand Mosque and the Prophet's Mosque",
    // Add icons etc. later
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang/dir set dynamically by context client-side
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-foreground", // Base text color set here
          notoSans.variable, // Apply font variables
          tajawal.variable
        )}
      >
        <LanguageProvider>
          {/* Added a flex-col structure to push footer down */}
          <div className="relative flex min-h-dvh flex-col"> {/* Use dvh for better mobile viewport height */}
            <Header />
            {/* Added flex-grow to make main content area expand */}
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
};