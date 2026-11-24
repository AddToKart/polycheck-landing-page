import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, {
  BulletList,
  Callout,
  LegalSection,
  type TocItem,
} from "@/components/legal/LegalLayout";
import { PRIVACY_CONTACT_EMAIL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions — Polycheck",
  description:
    "The rules for using the Polycheck app and web dashboard: accounts, attendance, acceptable use, the optional AI assistant, installing the Android app, and more.",
};

const toc: TocItem[] = [
  { id: "acceptance", title: "Acceptance" },
  { id: "accounts", title: "Accounts & your device" },
  { id: "attendance", title: "Recording attendance" },
  { id: "conduct", title: "Acceptable use" },
  { id: "flags", title: "Flags, disputes & decisions" },
  { id: "roles", title: "Instructors & officers" },
  { id: "ai", title: "Optional AI assistant" },
  { id: "install", title: "Installing the Android app" },
  { id: "availability", title: "Availability & maintenance" },
  { id: "ip", title: "Ownership" },
  { id: "liability", title: "Disclaimers & liability" },
  { id: "termination", title: "Suspension & ending use" },
  { id: "law", title: "Governing law" },
  { id: "changes", title: "Changes" },
  { id: "contact", title: "Contact" },
];

export default function TermsPage() {
  let n = 0;
  const next = () => ++n;

  return (
    <LegalLayout
      kicker="Terms & Conditions"
      title="The ground rules"
      intro="These terms explain what you can expect from Polycheck and what Polycheck expects from you. They apply to the Android app, the web dashboard and this website. By signing in or installing the app you agree to them."
      toc={toc}
      other={{ href: "/privacy", label: "Read the Privacy Policy" }}
    >
      <Callout title="The short version">
        <BulletList
          items={[
            "Use your own account, on your own device, and scan only when you are really in class.",
            "Do not fake your location, share QR codes, or tamper with the app.",
            "Check-ins can be flagged for review — you can contest them in the app.",
            "Install the app only from the official download link on this website.",
          ]}
        />
      </Callout>

      {/* 1 */}
      <LegalSection id="acceptance" index={next()} title="Acceptance">
        <p>
          Polycheck is attendance software operated for an educational institution (the
          “Institution”) that creates and manages your account. By installing the app, signing in,
          or using the web dashboard, you agree to these Terms and to the{" "}
          <Link href="/privacy" className="font-semibold text-maroon dark:text-golden underline underline-offset-4">
            Privacy Policy
          </Link>
          . If you do not agree, do not use Polycheck.
        </p>
        <p>
          Polycheck is for enrolled students, faculty and administrators of an Institution that
          uses it. The Institution may also have its own rules (for example on attendance,
          excuses and academic conduct); those apply in addition to these Terms, and where they
          conflict on an academic matter the Institution&rsquo;s rules decide.
        </p>
      </LegalSection>

      {/* 2 */}
      <LegalSection id="accounts" index={next()} title="Accounts & your device">
        <BulletList
          items={[
            "Your account is created and managed by the Institution. It is personal to you: do not share your password, and do not sign in for someone else.",
            "Keep your credentials safe and tell the Institution straight away if you think someone else has used your account.",
            "You may need to change a temporary password the first time you sign in.",
            <>
              Student accounts are tied to <strong>one active device at a time</strong>. While you
              are signed in on one phone, a sign-in from a different device is rejected. After you
              log out, a different device must wait out a cooldown (2 hours by default) before it can
              sign in. Signing back in on the same device is immediate. Faculty can release a device
              in an emergency, and that release is logged.
            </>,
            "Staff accounts may be used on more than one device.",
            "Keep the information on your account accurate. Ask the Institution to correct anything that is wrong.",
          ]}
        />
      </LegalSection>

      {/* 3 */}
      <LegalSection id="attendance" index={next()} title="Recording attendance">
        <BulletList
          items={[
            "Instructors start a session, which displays a QR code signed by their key. The code is valid for a short window (up to 15 minutes, set by the instructor), and a grace period may apply.",
            "For in-person sessions, the app reads your location once when you scan and checks it against the classroom geofence the instructor set. Your location must be accurate enough to be verified.",
            "Online sessions use check-in and check-out checkpoints, and may require a PIN. They do not use location.",
            "You can scan without a signal. The app saves the check-in on your phone and uploads it when you are back online, and the server re-checks it. Sync as soon as you can; a check-in that cannot be verified is flagged instead of counted.",
            "Time is judged against a trusted server clock, not your phone’s clock, so changing your device time does not help.",
            "A check-in is counted only after it passes verification. A confirmation on your screen is not a guarantee of the final result.",
          ]}
        />
        <p>
          You need to grant the camera and location permissions described in the Privacy Policy for
          scanning to work, and you must accept the current privacy notice before location evidence is
          submitted.
        </p>
      </LegalSection>

      {/* 4 */}
      <LegalSection id="conduct" index={next()} title="Acceptable use">
        <p>You agree not to:</p>
        <BulletList
          items={[
            "check in for someone else, or let someone check in for you;",
            "share, photograph, forward or post a session QR code so that someone who is not in the class can scan it;",
            "fake or mask your location, including with mock-location apps, or scan from outside the classroom;",
            "run Polycheck on a rooted or jailbroken device, an emulator, or with hooking or instrumentation tools attached in order to get around its checks;",
            "alter, replay, forge or reverse-engineer QR tokens, requests, the app or its security checks;",
            "attempt to access another person’s account or data, or data you are not authorized to see;",
            "upload photos or text that are false, unlawful, offensive or that you have no right to share;",
            "overload, scan, probe or disrupt the service or the Institution’s systems; or",
            "use Polycheck for any purpose other than the legitimate attendance and academic purposes it is provided for.",
          ]}
        />
        <p>
          Cheating attendance can be an academic-integrity matter under the Institution&rsquo;s own
          rules, separate from anything in these Terms.
        </p>
      </LegalSection>

      {/* 5 */}
      <LegalSection id="flags" index={next()} title="Flags, disputes & decisions">
        <p>
          Polycheck monitors for signs of cheating — such as an expired or reused QR code, a
          location outside the geofence, mock location, a rooted or emulated device, or a second
          device on the same account. When it sees one, the check-in is usually{" "}
          <strong>flagged as disputed</strong> and sent to the instructor rather than silently
          rejected.
        </p>
        <BulletList
          items={[
            "Students can dispute an entry or submit an excuse request in the app, with a reason and description.",
            "The instructor can accept the entry as present, reject it as absent, or override it manually. The decision is recorded with who made it and when.",
            "Automated checks support, and do not replace, an instructor’s judgment. Final attendance outcomes follow the Institution’s policies.",
          ]}
        />
      </LegalSection>

      {/* 6 */}
      <LegalSection id="roles" index={next()} title="Instructors & officers">
        <BulletList
          items={[
            "Instructors are responsible for configuring their sessions sensibly — the classroom location, geofence radius, QR validity, session mode and any PIN — and for reviewing disputes and excuses fairly.",
            "Instructors must show the session QR code only to the class it is for.",
            "Section officers (class president, QAC) may only do what their role grants: a president can create sessions for their own section, and QAC members can upload timestamped proof-of-class photos. Proof photos must be genuine and taken in the class.",
            "Administrators and faculty with a designation (IT Coordinator, Department Head, Registrar) must use their extra access only for its stated purpose and within their department scope. Their actions are written to an audit log.",
            "Everyone who can see other people’s attendance data must treat it as confidential and use it only for legitimate academic purposes.",
          ]}
        />
      </LegalSection>

      {/* 7 */}
      <LegalSection id="ai" index={next()} title="Optional AI assistant">
        <p>
          If the Institution turns it on, Polycheck includes an AI assistant. It is optional and
          may be unavailable to you.
        </p>
        <BulletList
          items={[
            "It can be wrong. Answers about your attendance standing are computed from your records and are advisory — not a promise that you will pass, and not an official decision.",
            "Do not rely on it for decisions about grades, discipline or eligibility; check with your instructor or the Institution.",
            "Your messages and the attendance data needed to answer them are processed by the AI provider the Institution has configured, as described in the Privacy Policy. Do not put sensitive information you do not want processed in your messages.",
            "Faculty-facing extraction tools only return data the person is already authorized to see.",
          ]}
        />
      </LegalSection>

      {/* 8 */}
      <LegalSection id="install" index={next()} title="Installing the Android app">
        <BulletList
          items={[
            "The only official source of the Polycheck Android app is the download link on this website, which serves the latest signed release from GitHub Releases. Do not install copies from anywhere else.",
            "Because the app is installed from a file rather than an app store, Android may ask you to allow installs from your browser or file manager. You can turn that permission off again afterwards.",
            "You can compare the file’s SHA-256 checksum, shown in the download window, with the file you received.",
            "The app requires Android 8.0 or later.",
            "Install updates when they are published; older versions may stop working or lose features.",
          ]}
        />
      </LegalSection>

      {/* 9 */}
      <LegalSection id="availability" index={next()} title="Availability & maintenance">
        <p>
          We aim to keep Polycheck available, but it may be unavailable from time to time. The
          Institution&rsquo;s administrators can put the system into maintenance mode, during which
          you may be unable to sign in or sync, and some features (including the AI assistant) may
          be switched off. Because the app works offline, scans made during an outage are saved and
          synced later, but the Institution may set deadlines for that.
        </p>
      </LegalSection>

      {/* 10 */}
      <LegalSection id="ip" index={next()} title="Ownership">
        <p>
          Polycheck, its software, design, logos and content belong to their respective owners and
          are protected by law. You get a personal, non-exclusive, non-transferable right to
          install and use the app for its intended attendance purpose. You may not copy, modify,
          redistribute, sell or reverse-engineer it, except as the law allows regardless of this
          clause.
        </p>
        <p>
          You keep ownership of what you submit (such as excuse text and photos), and you allow the
          Institution and Polycheck to store and use it to run the service as described in the
          Privacy Policy.
        </p>
      </LegalSection>

      {/* 11 */}
      <LegalSection id="liability" index={next()} title="Disclaimers & liability">
        <p>
          Polycheck is provided “as is” and “as available”. To the fullest extent permitted by law,
          we do not promise that it will be uninterrupted or error-free, that GPS or camera readings
          will always be accurate, or that every instance of cheating will be detected.
        </p>
        <p>
          To the extent the law allows, Polycheck and its contributors are not liable for indirect
          or consequential losses, or for losses caused by things outside our reasonable control —
          such as device faults, network or power outages, inaccurate GPS readings, or your failure
          to sync or to follow these Terms. Nothing in these Terms limits any liability that cannot
          be limited by law, or any right you have under the Data Privacy Act.
        </p>
      </LegalSection>

      {/* 12 */}
      <LegalSection id="termination" index={next()} title="Suspension & ending use">
        <p>
          The Institution can suspend or close an account, and we may restrict access, if these
          Terms are broken, if security is at risk, or when you leave the Institution. You can stop
          using Polycheck at any time by uninstalling the app and signing out of the web dashboard;
          ask the Institution if you want your account closed. Records that must be kept as part of
          the academic record, and the clauses that by their nature should continue, survive ending
          your use.
        </p>
      </LegalSection>

      {/* 13 */}
      <LegalSection id="law" index={next()} title="Governing law">
        <p>
          These Terms are governed by the laws of the Republic of the Philippines, including the
          Data Privacy Act of 2012 (Republic Act No. 10173). Courts of the Philippines have
          jurisdiction over disputes, without limiting any right you have to complain to the
          National Privacy Commission or to use the Institution&rsquo;s own grievance procedures.
        </p>
      </LegalSection>

      {/* 14 */}
      <LegalSection id="changes" index={next()} title="Changes">
        <p>
          We may update these Terms as Polycheck changes. We will change the “Last updated” date
          above, and for significant changes the app may ask you to accept the new version. If you
          keep using Polycheck after a change takes effect, you accept the updated Terms.
        </p>
      </LegalSection>

      {/* 15 */}
      <LegalSection id="contact" index={next()} title="Contact">
        <p>
          For questions about these Terms, or about your account, contact your Institution&rsquo;s
          Polycheck administrator.
          {PRIVACY_CONTACT_EMAIL ? (
            <>
              {" "}You can also write to{" "}
              <a
                href={`mailto:${PRIVACY_CONTACT_EMAIL}`}
                className="font-semibold text-maroon dark:text-golden underline underline-offset-4"
              >
                {PRIVACY_CONTACT_EMAIL}
              </a>
              .
            </>
          ) : null}
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
