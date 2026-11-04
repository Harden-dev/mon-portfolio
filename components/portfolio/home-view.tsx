"use client"

import * as React from "react"

import { useSiteCopy } from "@/components/locale-provider"
import { DomainBoard } from "@/components/portfolio/domain-board"
import { HeroSection } from "@/components/portfolio/hero-section"
import { JourneyCard } from "@/components/portfolio/journey-card"
import { ProjectRegister } from "@/components/portfolio/project-register"
import {
  SiteHeader,
  useActiveSectionHash,
} from "@/components/portfolio/site-header"
import { StackSection } from "@/components/portfolio/stack-section"

function SectionHead({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-10 flex flex-col gap-4">
      <h2 className="section-title">{title}</h2>
      {note ? (
        <p className="prose-col text-base text-dim italic">{note}</p>
      ) : null}
    </div>
  )
}

export function HomeView() {
  const site = useSiteCopy()
  const activeHash = useActiveSectionHash()
  const domains = React.useMemo(
    () => site.projects.map((p) => p.domain),
    [site.projects]
  )

  return (
    <>
      <SiteHeader activeHash={activeHash} />

      <main>
        <div className="sheet">
          <HeroSection />
        </div>

        <DomainBoard items={domains} />

        <section id="work" className="scroll-mt-20 pt-20 pb-20 sm:pt-24">
          <div className="sheet">
            <SectionHead title={site.work.title} note={site.work.subtitle} />
          </div>
          {/* The board bleeds past the text column — it is the loud thing. */}
          <ProjectRegister projects={site.projects} />
        </section>

        <section
          id="about"
          className="sheet scroll-mt-20 border-t border-line py-20 sm:py-24"
        >
          <SectionHead title={site.ui.kickers.about} />
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <p className="prose-col text-justify text-lg leading-[1.68] text-chalk/85">
              {site.about.body}
            </p>
            <JourneyCard
              heading={site.ui.journeyTitle}
              entries={site.timeline}
            />
          </div>
        </section>

        <section
          id="stack"
          className="sheet scroll-mt-20 border-t border-line py-20 sm:py-24"
        >
          <SectionHead title={site.ui.kickers.skills} />
          <StackSection />
        </section>

        <section
          id="contact"
          className="sheet scroll-mt-20 border-t border-line py-20 sm:py-28"
        >
          <h2 className="section-title max-w-3xl text-balance">
            {site.contact.headline}
          </h2>
          <p className="prose-col mt-6 text-base text-dim italic">
            {site.contact.sub}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
            <a href={site.contact.mailHref} className="button-hot text-base">
              {site.contact.cta}
            </a>
            <a href={site.contact.mailHref} className="link-hot text-lg">
              {site.contact.email}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-line pt-8">
            <span className="text-sm text-dim">{site.ui.elsewhere}</span>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-quiet text-sm"
            >
              LinkedIn
            </a>
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-quiet text-sm"
            >
              GitHub
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
