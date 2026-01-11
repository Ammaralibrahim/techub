import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TechHub Studio | Premium Web Development Agency",
  description: "Modern, high-end websites for brands & businesses worldwide. Ultra-premium web solutions with luxury design and cutting-edge technology.",
  keywords: "web development, luxury websites, premium design, business websites, brand development",
  authors: [{ name: "TechHub Studio" }],
  creator: "TechHub Studio",
  publisher: "TechHub Studio",
  openGraph: {
    title: "TechHub Studio | Premium Web Development Agency",
    description: "Modern, high-end websites for brands & businesses worldwide.",
    type: "website",
    locale: "en_US",
    url: "https://techhubstudio.com",
    siteName: "TechHub Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechHub Studio | Premium Web Development Agency",
    description: "Modern, high-end websites for brands & businesses worldwide.",
    creator: "@techhubstudio",
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

}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <main className="min-h-screen bg-black text-white">
          {children}
        </main>
      </body>
    </html>
  )
}