"use client"

import { useSiteCopy } from "@/components/locale-provider"
import { ContactSection } from "@/components/portfolio/contact-section"
import { HeroSection } from "@/components/portfolio/hero-section"
import { JourneyCard } from "@/components/portfolio/journey-card"
import { Reveal, SectionHead } from "@/components/portfolio/motion"
import { ProjectGrid } from "@/components/portfolio/project-grid"
import {
  SiteHeader,
  useActiveSectionHash,
} from "@/components/portfolio/site-header"
import { StackSection } from "@/components/portfolio/stack-section"
import { TechMarquee } from "@/components/portfolio/tech-marquee"

export function HomeView() {
  const site = useSiteCopy()
  const activeHash = useActiveSectionHash()

  return (
    <>
      <SiteHeader activeHash={activeHash} />

      <main>
        <HeroSection />
        <TechMarquee />

        <section id="work" className="sheet scroll-mt-20 py-20 sm:py-28">
          <SectionHead
            eyebrow={site.ui.kickers.projects}
            title={site.work.title}
            note={site.work.subtitle}
            className="mb-12"
          />
          <ProjectGrid projects={site.projects} />
        </section>

        <section
          id="about"
          className="scroll-mt-20 border-y border-line bg-panel/60 py-20 sm:py-28"
        >
          <div className="sheet grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <SectionHead
                eyebrow={site.ui.kickers.about}
                title={site.about.title}
              />
              <Reveal delay={0.06}>
                <p className="mt-6 text-base leading-relaxed text-pretty text-soft sm:text-lg">
                  {site.about.body}
                </p>
                <dl className="mt-8 grid gap-4 border-t border-line pt-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {site.ui.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-xs font-medium tracking-wide text-faint uppercase">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-ink">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <JourneyCard
                heading={site.ui.journeyTitle}
                entries={site.timeline}
              />
            </Reveal>
          </div>
        </section>

        <section id="stack" className="sheet scroll-mt-20 py-20 sm:py-28">
          <SectionHead
            eyebrow={site.ui.kickers.skills}
            title={site.stack.title}
            note={site.stack.intro}
            className="mb-12"
          />
          <StackSection />
        </section>

        <section id="contact" className="sheet scroll-mt-20 pb-20 sm:pb-28">
          <ContactSection />
        </section>
      </main>
    </>
  )
}
