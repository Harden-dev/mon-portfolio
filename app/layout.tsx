import { Geist } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { LocaleProvider } from "@/components/locale-provider"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { cn } from "@/lib/utils"
import { site } from "@/lib/site-data"

/** One family for the whole page; hierarchy comes from size and weight. */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: {
    default: `${site.name}, ${site.role}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.tagline,
  metadataBase: new URL(site.sourceSite),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(geist.variable, "font-sans")}
    >
      <head>
        {/* Scroll reveals start hidden in the server HTML and are shown by
            JavaScript. Without JavaScript, show everything straight away. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="relative min-h-svh overflow-x-clip bg-paper text-ink">
        <LocaleProvider>
          <div className="relative flex min-h-svh flex-col">
            <div className="flex flex-1 flex-col">{children}</div>
            <SiteFooter />
          </div>
        </LocaleProvider>
      </body>
    </html>
  )
}
