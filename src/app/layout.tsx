import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Khanh Nguyen | Software Engineer",
  description: "Portfolio of a passionate Software Engineer specializing in building exceptional digital experiences with modern web technologies.",
  keywords: ["Software Engineer", "Full Stack Developer", "React", "Next.js", "TypeScript", "Portfolio"],
  authors: [{ name: "Khanh Nguyen" }],
  openGraph: {
    title: "Khanh Nguyen | Software Engineer",
    description: "Portfolio of a passionate Software Engineer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Grid Background */}
          <div className="grid-background" aria-hidden="true" />

          {/* Mesh Gradient Decorations */}
          <div className="mesh-gradient-top-left" aria-hidden="true" />
          <div className="mesh-gradient-bottom-right" aria-hidden="true" />
          <div className="mesh-gradient-center" aria-hidden="true" />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
