"use client";

import { useState } from "react";
import { Send, UserX, Navigation, ImageIcon, Clock } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const questions = [
  {
    icon: Send,
    question: "What if I send the code to an absent friend?",
    short: "In a face-to-face class, it won't count.",
    detail:
      "Your friend isn't in the classroom, so the check-in isn't accepted, and the code also stops working after a short time. Online classes don't use location. They rely on short time limits and a PIN your teacher can announce.",
  },
  {
    icon: UserX,
    question: "What if someone else tries to sign in as me?",
    short: "Not while you're signed in.",
    detail:
      "A student account works on one device at a time. After you sign out, a different device has to wait before it can sign in (2 hours unless your school changes it). Your teacher can remove the wait if you have an emergency.",
  },
  {
    icon: Navigation,
    question: "What if someone uses a fake location app?",
    short: "The Android app looks for it.",
    detail:
      "The Android app refuses a check-in when it detects a fake location. Phones that look tampered with are flagged for the teacher. This can't catch everything, and the website cannot detect a fake location.",
  },
  {
    icon: ImageIcon,
    question: "What if I save a screenshot and use it later?",
    short: "An old screenshot stops working.",
    detail:
      "Each code is only open for a short time. In face-to-face classes you also have to be in the room, and the same student can't be counted twice for one class.",
  },
  {
    icon: Clock,
    question: "What if I change the time on my phone?",
    short: "It doesn't help.",
    detail:
      "The code carries the time it was made, in a way that can't be edited, and PolyCheck checks it against the server's clock instead of trusting your phone's.",
  },
];

export default function AntiCheatShowcase() {
  const [selected, setSelected] = useState(0);
  const current = questions[selected];

  return (
    <section id="fair" className="bg-page px-5 sm:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Fair attendance" title="Can someone cheat it?">
          PolyCheck makes cheating harder and easier to spot. No single check is perfect.
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-4 lg:gap-6 items-stretch">
          <Reveal>
            <div className="flex flex-col gap-2.5">
              {questions.map((item, i) => {
                const isSelected = selected === i;
                return (
                  <div key={item.question}>
                    <button
                      type="button"
                      onClick={() => setSelected(i)}
                      aria-expanded={isSelected}
                      className={`card flex w-full min-h-16 items-center gap-4 p-4 text-left transition-colors ${
                        isSelected ? "card-edge bg-[var(--accent-wash)]" : "hover:bg-[var(--accent-wash)]"
                      }`}
                    >
                      <item.icon aria-hidden="true" className={`w-5 h-5 shrink-0 ${isSelected ? "text-accent" : "text-muted"}`} />
                      <span className="font-bold text-[15px] sm:text-base leading-snug text-ink">{item.question}</span>
                    </button>
                    {/* On phones the answer opens right under its question. */}
                    {isSelected ? (
                      <div className="panel p-5 lg:hidden">
                        <p className="panel-head font-lora font-bold text-xl mb-2">{item.short}</p>
                        <p className="text-[15px] leading-relaxed">{item.detail}</p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal className="hidden lg:block" delay={120}>
            <div aria-live="polite" className="panel flex h-full flex-col justify-center p-10">
              <current.icon aria-hidden="true" className="panel-head w-10 h-10 mb-6" />
              <p className="panel-head font-lora font-bold text-3xl leading-snug mb-4">{current.short}</p>
              <p className="text-base leading-relaxed">{current.detail}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
