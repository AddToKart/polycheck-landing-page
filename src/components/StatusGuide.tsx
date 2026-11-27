import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// The same labels and colors people see inside the app. Class names are written out
// in full so Tailwind keeps their styles.
const statuses = [
  { key: "present", style: "badge-present", label: "Present", meaning: "You checked in on time." },
  { key: "late", style: "badge-late", label: "Late", meaning: "You checked in during the extra time after the deadline." },
  { key: "absent", style: "badge-absent", label: "Absent", meaning: "No check-in was counted for that class." },
  { key: "excused", style: "badge-excused", label: "Excused", meaning: "Your teacher accepted your excuse." },
  { key: "disputed", style: "badge-disputed", label: "Disputed", meaning: "Something needs a second look. Your teacher will decide." },
];

export default function StatusGuide() {
  return (
    <section className="bg-page px-5 sm:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Your records" title="What each label means.">
          These are the labels you&apos;ll see next to your classes.
        </SectionHeading>

        <Reveal>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-line border">
            {statuses.map((status) => (
              <div key={status.key} className="bg-card flex items-center gap-4 p-5 lg:flex-col lg:items-start">
                <dt className="w-28 shrink-0 lg:w-auto">
                  <span className={`badge ${status.style}`}>{status.label}</span>
                </dt>
                <dd className="text-[15px] leading-relaxed text-muted">{status.meaning}</dd>
              </div>
            ))}
            {/* Fills the empty cell when the five labels sit in two columns. */}
            <div aria-hidden="true" className="hidden sm:block lg:hidden bg-card" />
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
