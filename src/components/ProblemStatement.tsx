import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const changes = [
  {
    topic: "Signing for friends",
    paper: "Anyone can write a classmate's name on the sheet.",
    polycheck: "Each student checks in from their own account, and face-to-face classes check you're in the room.",
  },
  {
    topic: "Weak signal",
    paper: "Online forms fail when the classroom has no connection.",
    polycheck: "Check-ins are saved on your phone and sent once you're back online.",
  },
  {
    topic: "Counting it all up",
    paper: "Sheets get lost, and teachers re-type and total them by hand.",
    polycheck: "Records are totalled for the teacher and can be downloaded as a report.",
  },
];

export default function ProblemStatement() {
  return (
    <section className="bg-page px-5 sm:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Why not paper?" title="Fairer for students, easier for teachers." />

        <div className="border-t">
          {changes.map((change) => (
            <Reveal key={change.topic}>
              <div className="grid grid-cols-1 md:grid-cols-[13rem_1fr_auto_1.25fr] gap-3 md:gap-6 md:items-center border-b py-6">
                <h3 className="font-lora font-bold text-xl text-ink">{change.topic}</h3>
                <p className="text-[15px] leading-relaxed text-muted">
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] mb-1">On paper</span>
                  {change.paper}
                </p>
                <ArrowRight aria-hidden="true" className="hidden md:block w-5 h-5 text-accent" />
                <p className="card card-edge p-4 text-[15px] leading-relaxed text-ink">
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] mb-1 text-accent">With PolyCheck</span>
                  {change.polycheck}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
