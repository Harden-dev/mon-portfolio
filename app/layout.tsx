import { DM_Sans, Space_Grotesk } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { LocaleProvider } from "@/components/locale-provider"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { cn } from "@/lib/utils"
import { site } from "@/lib/site-data"

/** Space Grotesk shouts, DM Sans explains. Nothing else gets a voice. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.shortName}`,
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
      className={cn(spaceGrotesk.variable, dmSans.variable, "font-sans")}
    >
      <body className="relative min-h-svh overflow-x-clip bg-void text-chalk">
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
