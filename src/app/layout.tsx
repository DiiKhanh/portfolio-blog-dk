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

const SITE_URL = "https://portfolio-blog-dk.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Khanh Pham | Software Engineer",
    template: "%s | Khanh Pham",
  },
  description:
    "Portfolio of Khanh Pham — Software Engineer specializing in React, Next.js, Golang, and Flutter. Building reliable web, mobile, and backend systems.",
  keywords: [
    "Khanh Pham",
    "Pham Duy Khanh",
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Golang Developer",
    "Flutter Developer",
    "React Native",
    "Web Developer",
    "Mobile Developer",
    "Backend Developer",
    "Portfolio",
    "Vietnam Developer",
  ],
  authors: [{ name: "Khanh Pham", url: SITE_URL }],
  creator: "Khanh Pham",
  publisher: "Khanh Pham",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Khanh Pham Portfolio",
    title: "Khanh Pham | Software Engineer",
    description:
      "Software Engineer specializing in React, Next.js, Golang, and Flutter. Building reliable web, mobile, and backend systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Khanh Pham — Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khanh Pham | Software Engineer",
    description:
      "Software Engineer specializing in React, Next.js, Golang, and Flutter. Building reliable web, mobile, and backend systems.",
    images: ["/og-image.png"],
    creator: "@DiiKhanh",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
};

// JSON-LD structured data
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Khanh Pham",
  alternateName: "Pham Duy Khanh",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  jobTitle: "Software Engineer",
  description:
    "Software Engineer specializing in React, Next.js, Golang, and Flutter. Building reliable web, mobile, and backend systems.",
  email: "duykhanh.030803@gmail.com",
  sameAs: [
    "https://github.com/DiiKhanh",
    "https://www.linkedin.com/in/duykhanh030803/",
    "https://www.facebook.com/dikhanhnek/",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Golang",
    "Flutter",
    "React Native",
    "Docker",
    "REST APIs",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Khanh Pham Portfolio",
  url: SITE_URL,
  description:
    "Portfolio of Khanh Pham — Software Engineer specializing in React, Next.js, Golang, and Flutter.",
  author: {
    "@type": "Person",
    name: "Khanh Pham",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
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

