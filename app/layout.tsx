import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IntroScreen from "./components/IntroScreen";
import InteractiveDotGrid from "./components/InteractiveDotGrid";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import { ThemeProvider } from "./components/ThemeProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammad Iqbal — Junior Developer",
  description: "Portfolio website of Mohammad Iqbal, a junior developer specializing in Next.js, Laravel, and Java",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} bg-canvas transition-colors duration-300`}>
      <body className="h-screen w-screen flex flex-col antialiased overflow-hidden bg-transparent text-ink">
        <ThemeProvider>
          <CustomCursor />
          <ScrollProgress />
          <InteractiveDotGrid />
          <IntroScreen />
          <Header />
          <main className="flex-1 overflow-y-auto scroll-smooth" id="main-scroll">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
