import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import IngestGateway from "./IngestGateway";
import TechStack from "./TechStack";

// Plain-language versions of the load-test figures. The full numbers and test
// conditions are in IngestGateway; change both together.
const results = [
  {
    value: "2,000",
    label: "first-time check-ins, 100 at a time",
    detail: "None failed. 19 out of every 20 got a reply in under three quarters of a second.",
  },
  {
    value: "6,042 of 6,042",
    label: "accepted check-ins were saved",
    detail: "Counted across all of our test runs, with nothing left waiting afterwards.",
  },
  {
    value: "82,996",
    label: "saved records checked for changes",
    detail: "Records are linked to each other so edits can be spotted. No broken links were found.",
  },
];

function More({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return (
    <details className="more card">
      <summary className="min-h-16 p-5">
        <span>
          <span className="block font-bold text-base text-ink">{title}</span>
          <span className="block text-sm text-muted">{hint}</span>
        </span>
        <Plus aria-hidden="true" className="more-icon w-6 h-6 shrink-0 text-accent" />
      </summary>
      <div className="border-t p-3 sm:p-5">{children}</div>
    </details>
  );
}

export default function UnderTheHood() {
  return (
    <section id="tech" className="bg-page px-5 sm:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Speed and reliability" title="Ready for when the whole class scans at once.">
          Check-ins are checked right away, lined up, and then saved in order, so a rush at the start of class
          doesn&apos;t have to wait on each save.
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {results.map((result, i) => (
            <Reveal key={result.label} delay={i * 90}>
              <div className="card card-edge h-full p-6">
                <p className="font-lora font-bold text-3xl lg:text-4xl text-accent leading-tight">{result.value}</p>
                <p className="mt-1 font-bold text-base text-ink">{result.label}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{result.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          These are our own tests from November 2026, on a small test server with made-up data, not a real
          campus. Your results will depend on the server and the internet connection.
        </p>

        <div className="mt-10 space-y-3">
          <p className="text-sm font-bold text-ink">For readers who want the technical details</p>
          <More title="How the check-in server works" hint="The pipeline, full test figures and what happens when something fails">
            <IngestGateway />
          </More>
          <More title="What PolyCheck is built with" hint="Programming tools, database and hosting">
            <TechStack />
          </More>
        </div>
      </div>
    </section>
  );
}
