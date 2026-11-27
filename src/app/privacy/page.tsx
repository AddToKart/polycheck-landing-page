import type { Metadata } from "next";
import LegalLayout, {
  BulletList,
  Callout,
  DataTable,
  LegalSection,
  SubHeading,
  type TocItem,
} from "@/components/legal/LegalLayout";
import { PRIVACY_CONTACT_EMAIL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — PolyCheck",
  description:
    "What the PolyCheck app and web dashboard collect, why, who can see it, how long it is kept, and the choices you have.",
};

const toc: TocItem[] = [
  { id: "scope", title: "Who this covers" },
  { id: "signup", title: "Sign-up requests" },
  { id: "collect", title: "What we collect" },
  { id: "permissions", title: "Permissions on your phone" },
  { id: "not-collected", title: "What we do not collect" },
  { id: "use", title: "How we use it" },
  { id: "access", title: "Who can see it" },
  { id: "third-parties", title: "Third parties" },
  { id: "retention", title: "How long we keep it" },
  { id: "security", title: "How we protect it" },
  { id: "cookies", title: "Cookies & local storage" },
  { id: "rights", title: "Your rights & choices" },
  { id: "changes", title: "Changes" },
  { id: "contact", title: "Contact" },
];

export default function PrivacyPage() {
  let n = 0;
  const next = () => ++n;

  return (
    <LegalLayout
      kicker="Privacy Policy"
      title="Your data, in plain language"
      intro="PolyCheck records attendance. To do that honestly it has to know who you are, which class you are in, and — for in-person classes — roughly where you are when you scan. This page lists everything the app and web dashboard collect, and what happens to it."
      toc={toc}
      other={{ href: "/terms", label: "Read the Terms & Conditions" }}
    >
      <Callout title="At a glance">
        <BulletList
          items={[
            <>Location is read <strong>only at the moment you scan</strong> a QR code in an <strong>in-person</strong> session. Online sessions never collect it, and the app does not track you in the background.</>,
            <>Check-in coordinates are <strong>automatically erased after 7–90 days</strong> (30 by default). The attendance result itself stays with the class record.</>,
            <>We use your data to verify attendance, catch proxy check-ins and resolve disputes — <strong>not for advertising</strong>, and we do not sell it.</>,
            <>The Android app contains <strong>no advertising or third-party analytics SDKs</strong>.</>,
            <>You can ask for access, correction or deletion, and you can contest any attendance entry from inside the app.</>,
          ]}
        />
      </Callout>

      {/* 1 */}
      <LegalSection id="scope" index={next()} title="Who this covers">
        <p>
          This policy applies to the PolyCheck Android app, the PolyCheck web dashboard, and this
          website. PolyCheck is attendance software that is set up and run by an educational
          institution (the “Institution”). The Institution decides who gets an account, which
          classes exist and what its retention settings are, and is responsible for your
          information as the personal information controller. PolyCheck provides the tools it
          uses.
        </p>
        <p>
          Accounts are created by the Institution for its students, faculty and administrators,
          including through the temporary sign-up described below. PolyCheck is not offered to the general public and is not directed at children outside
          an institution&rsquo;s enrolled student body.
        </p>
        <p>
          The Philippine <strong>Data Privacy Act of 2012 (Republic Act No. 10173)</strong> is the
          framework the product is built around. Authorized administrators also have an in-app
          privacy center that shows the data inventory and retention figures from live data.
        </p>
      </LegalSection>

      <LegalSection id="signup" index={next()} title="Sign-up requests">
        <p>
          While PolyCheck is being evaluated, the Institution may open a temporary sign-up page on
          this website. Sending a request does not create an account: an administrator reviews it
          first.
        </p>
        <BulletList
          items={[
            <><strong>What the form takes:</strong> your full name, email address and chosen password, and for students the student number, program and year level. It also records when you accepted this policy.</>,
            <><strong>What it is used for:</strong> only to review your request and create your account. The password is stored only as a salted bcrypt hash.</>,
            <><strong>Who sees it:</strong> the Institution&rsquo;s system administrators. They never see your password.</>,
            <><strong>How long:</strong> a waiting request is kept until it is decided. A rejected request is deleted. When a request is approved, the password hash moves to your account and the rest is kept as the record of the approval.</>,
            <><strong>Spam protection:</strong> your IP address is counted for up to one hour to limit repeated requests. This page sets no cookies.</>,
          ]}
        />
      </LegalSection>

      {/* 2 */}
      <LegalSection id="collect" index={next()} title="What we collect">
        <p>
          The table lists every category of personal information PolyCheck stores, why, and on
          what basis. It follows the data inventory published inside the app.
        </p>
        <DataTable
          headers={["What", "Why we need it", "Basis"]}
          rows={[
            [
              "Account identity — full name, student number, program and year level, department, role, school and contact email, contact phone",
              "Build class rosters, show your digital student ID, and keep official class records. Contact details let the Institution reach you about your account.",
              "Legitimate educational interests",
            ],
            [
              "Sign-in credentials — password (stored only as a salted bcrypt hash, never in readable form), sign-in sessions (which record the IP address and browser or app details) and, if used, hashed single-use activation or password-reset links",
              "Authenticate you, keep you signed in and, if you ask, reset your password through the contact email on your profile.",
              "Legitimate educational interests",
            ],
            [
              "Attendance record — class session, status (present, late, absent, excused, disputed, incomplete), timestamps and a snapshot of the signed QR token you scanned",
              "The official attendance record for each class meeting.",
              "Legitimate educational interests",
            ],
            [
              "Check-in location — GPS coordinates and accuracy captured when you scan (in-person sessions only)",
              "Confirm you were physically inside the classroom geofence — the anti-proxy check.",
              "Your consent, given at onboarding",
            ],
            [
              "Scan-attempt details — device claims, location accuracy, mock-location flag, how the QR was provided (camera, upload, manual), and risk signals (see below)",
              "Audit trail and anti-cheat review of accepted, rejected and suspicious scans.",
              "Legitimate educational interests",
            ],
            [
              "Signed QR tokens and their hashes — issued when an instructor starts a session, valid 1–15 minutes",
              "Cryptographic proof that a check-in came from an instructor-signed code and was not replayed.",
              "Legitimate educational interests",
            ],
            [
              "Disputes and excuse requests — reason, description, any photo you attach as evidence, and the decision with who made it",
              "Let you contest an attendance entry and let instructors resolve it with a record of why.",
              "Legitimate educational interests; your consent",
            ],
            [
              "Proof-of-class photos and issue-report screenshots",
              "Show a class meeting took place (uploaded by authorized officers or instructors) and document problems people report.",
              "Legitimate educational interests",
            ],
            [
              "Issue reports — category, severity and description you submit",
              "Let administrators triage bugs, scanner or GPS problems and feedback.",
              "Legitimate educational interests",
            ],
            [
              "Notifications — the in-app notices shown inside the app and web dashboard",
              "Tell you about excuse decisions, disputes and class events.",
              "Legitimate educational interests",
            ],
            [
              "Audit log — who did what and when, including changes to Institution settings; some entries also record the IP address",
              "Accountability for sensitive actions.",
              "Legitimate educational interests",
            ],
            [
              "Optional AI assistant — the messages you send and the attendance data needed to answer them (only if the Institution enables the assistant)",
              "Answer questions about your own attendance standing (students) or prepare lists and extracts (faculty).",
              "Legitimate educational interests",
            ],
          ]}
        />

        <p>
          PolyCheck also records which version of this notice you accepted and when, and, for
          email it sends you, whether the message was delivered.
        </p>

        <SubHeading>Device and security signals</SubHeading>
        <p>To protect attendance from cheating, PolyCheck collects a small set of technical signals:</p>
        <BulletList
          items={[
            "An opaque installation identifier for your device, used to enforce one active device per student account and the cooldown rules described in the Terms. It is not your phone number, IMEI, advertising ID or hardware serial number.",
            "Android app only: whether a mock-location (fake GPS) provider is active.",
            "Android app only: whether the device appears to be rooted, running on an emulator, or has a dynamic hooking tool attached.",
            "Your IP address and browser or app user agent, recorded with sign-ins. Some audited actions also record the IP address.",
          ]}
        />
        <p>
          These signals can cause a check-in to be flagged as <em>disputed</em> for an instructor
          to review. They do not by themselves decide your grade or academic standing. The web
          dashboard cannot detect fake GPS or a rooted device, and the Android signals come from
          your phone, so they cannot catch every attempt.
        </p>

        <SubHeading>Instructor location</SubHeading>
        <p>
          When an instructor activates an <em>in-person</em> session, the device&rsquo;s location
          may be used to confirm that the geofence is placed where the class actually is.
          Online sessions never send coordinates.
        </p>

        <SubHeading>Data stored on your device</SubHeading>
        <p>
          So that check-ins work without a signal, the Android app keeps a local, per-account
          database of your classes and any check-ins waiting to sync. An attendance PIN, if a
          session uses one, is stored encrypted (AES-256-GCM) while it waits to sync, and
          sign-in credentials and keys are held in the Android secure storage. Pending check-ins
          are uploaded when the phone reconnects or the app is reopened. A check-in that cannot
          be accepted is kept on the phone, including its location, so you can see what happened.
          It stays until you sign out of the app or uninstall it; the server&rsquo;s automatic
          location erasure does not reach data stored on your phone.
        </p>
      </LegalSection>

      {/* 3 */}
      <LegalSection id="permissions" index={next()} title="Permissions on your phone">
        <p>The Android app asks for these permissions and nothing else:</p>
        <DataTable
          headers={["Permission", "What it is used for"]}
          rows={[
            ["Camera", "Scan attendance QR codes and take proof-of-class photos. QR frames are read on the device; they are not saved or uploaded."],
            ["Location (precise and approximate)", "Read your position once, at scan time, to check the classroom geofence — in-person sessions only."],
            ["Internet", "Sign in, sync attendance, load class data and receive live updates."],
            ["Network state", "Tell whether the phone is online, so waiting check-ins can be sent."],
            ["Notifications", "Declared so the app can show system alerts. The current version does not send push notifications."],
            ["Vibration", "Haptic feedback when a scan succeeds or fails."],
          ]}
        />
        <p>
          You can withdraw any permission in Android settings at any time. Without camera access
          you cannot scan; without location access in-person check-in cannot be verified.
        </p>
      </LegalSection>

      {/* 4 */}
      <LegalSection id="not-collected" index={next()} title="What we do not collect">
        <BulletList
          items={[
            "Background or continuous location. PolyCheck does not request background-location access and does not trace where you go.",
            "Your contacts, call logs, SMS, microphone recordings or files outside what you choose to attach.",
            "Advertising identifiers, or data for advertising, profiling or sale to third parties.",
            "Location during online sessions.",
          ]}
        />
      </LegalSection>

      {/* 5 */}
      <LegalSection id="use" index={next()} title="How we use it">
        <BulletList
          items={[
            "Verify that a check-in came from a genuine, unexpired, instructor-signed QR code, from the right place, at the right time.",
            "Prevent duplicate, proxy or spoofed check-ins and route suspicious ones to an instructor for review.",
            "Maintain the official attendance record, class rosters, schedules and your digital student ID.",
            "Resolve disputes and excuse requests, and show instructors which students may need a check-in on their attendance.",
            "Produce attendance reports and exports for authorized staff.",
            "Keep the service secure, reliable and auditable, and fix problems that users report.",
          ]}
        />
        <p>
          We do not use your information to make automated decisions about your grades. Where the
          optional AI assistant gives an attendance standing, it is advisory and computed from your
          records; it is never a guarantee or a final decision.
        </p>
      </LegalSection>

      {/* 6 */}
      <LegalSection id="access" index={next()} title="Who can see it">
        <p>Access is limited by role and scope:</p>
        <BulletList
          items={[
            <><strong>Students</strong> see their own records, classes, schedule and ID. Section officers (class president, QAC) can additionally do what their role allows — create sessions or upload proof-of-class photos for their own section.</>,
            <><strong>Faculty</strong> see the classes and sessions they teach, including check-in results, disputes, excuse requests and proof photos for those classes.</>,
            <><strong>Administrators</strong> — super admins and faculty with an administrative designation (IT Coordinator, Course Head, Registrar) — see only what their designation and course or department scope requires, such as reports, account management or server status.</>,
          ]}
        />
        <p>
          Sensitive actions, including settings changes and AI tool use, are written to the audit
          log. Your information is not shared with other institutions or with third parties for
          their own purposes.
        </p>
      </LegalSection>

      {/* 7 */}
      <LegalSection id="third-parties" index={next()} title="Third parties">
        <p>Some services outside PolyCheck take part in specific features:</p>
        <DataTable
          headers={["Service", "When", "What it sees"]}
          rows={[
            [
              "GitHub (APK hosting)",
              "When you open this website or download the app. The page asks GitHub for the latest release’s version and file size, and the APK itself is served from GitHub Releases.",
              "Your IP address and browser details, under GitHub’s own privacy statement. No PolyCheck account data.",
            ],
            [
              "Resend (email delivery)",
              "Only if the Institution turns email on: to send an account activation link, or a password reset link you ask for.",
              "The recipient email address, your name, and the message containing a single-use link, plus delivery status. No password, student number or attendance data is included.",
            ],
            [
              "OpenStreetMap (Android app) and CARTO (web dashboard)",
              "When a classroom map is shown.",
              "Standard map-tile requests: your IP address and the map area being viewed. Not attendance data.",
            ],
            [
              "Google Fonts",
              "When the Android app downloads its typefaces.",
              "Your IP address and device or app details, under Google’s own privacy terms. No PolyCheck account data.",
            ],
            [
              "AI provider chosen by the Institution",
              "Only if the Institution turns the assistant on and you use it.",
              "Your messages and the attendance data needed to answer them. The provider’s own terms also apply. Conversation threads are kept for 7 days.",
            ],
            [
              "Error monitoring (web dashboard)",
              "If the Institution has configured it.",
              "Technical error reports: error details, page address and browser/device information.",
            ],
            [
              "Hosting and network providers, such as Vercel and Cloudflare",
              "Always. They host this website and the web dashboard and carry traffic to the Institution’s server.",
              "Standard server access logs, such as IP address and request time.",
            ],
          ]}
        />
        <p>
          The Android app itself contains no advertising or analytics SDKs, and PolyCheck does not
          embed social-media trackers.
        </p>
      </LegalSection>

      {/* 8 */}
      <LegalSection id="retention" index={next()} title="How long we keep it">
        <DataTable
          headers={["Data", "Kept for"]}
          rows={[
            ["Account identity", "For as long as the Institution keeps the account. Accounts are disabled rather than deleted in the app; send erasure requests to the Institution."],
            ["Attendance record and signed token snapshot", "With the academic-year records. The decision (present, late, absent…) is never shredded."],
            ["Check-in GPS coordinates, accuracy and risk signals on the server", "Automatically erased by a nightly job after the Institution’s retention window: 7–90 days, 30 by default. The attendance result stays."],
            ["Rejected scan attempts not linked to an attendance record", "Deleted after 90 days by default."],
            ["Dispute and excuse submissions", "With the academic-year record; the outcome is kept after coordinates are erased."],
            ["Proof-of-class photos", "Until an instructor deletes them. Report screenshots follow the lifecycle of the report."],
            ["Notifications", "Pruned after 30 days."],
            ["AI assistant conversations", "7 days."],
            ["Audit log", "7 years by default."],
            ["Server backups", "Not created automatically by PolyCheck. If the Institution’s server administrator makes backups, they are kept for the period the Institution sets, in addition to the above."],
          ]}
        />
        <p>
          Retention periods are settings the Institution can adjust within the documented limits;
          the figures above are the defaults.
        </p>
      </LegalSection>

      {/* 9 */}
      <LegalSection id="security" index={next()} title="How we protect it">
        <BulletList
          items={[
            "Traffic between the apps and the server uses HTTPS.",
            "QR codes are signed with Ed25519 and expire within minutes, so they cannot be forged or reused later.",
            "Passwords are hashed with bcrypt; sign-in sessions use HTTP-only, same-site cookies on the web and secure storage on Android.",
            "On-device offline data is partitioned per account, and pending attendance PINs are encrypted with AES-256-GCM.",
            "Access is role- and scope-based, and sensitive actions are recorded in an audit log.",
            "Attendance records are hash-chained, and a daily anchor of that chain is written to the audit log, so altering them can be detected.",
            "Location coordinates are automatically erased on a schedule instead of being kept indefinitely.",
          ]}
        />
        <p>
          No system is perfectly secure. If a security incident affects personal information, the
          Institution, as controller, is responsible for assessing it and notifying affected people
          and the regulator as the law requires.
        </p>
      </LegalSection>

      {/* 10 */}
      <LegalSection id="cookies" index={next()} title="Cookies & local storage">
        <SubHeading>This website</SubHeading>
        <p>
          This landing page sets no tracking or advertising cookies and uses no analytics. It
          remembers your light/dark theme choice in your browser&rsquo;s local storage. Its only
          network calls are to GitHub for the app version and download, described above.
        </p>
        <SubHeading>The web dashboard</SubHeading>
        <BulletList
          items={[
            "A strictly necessary session cookie keeps you signed in. It is HTTP-only, same-site strict and lasts up to 7 days.",
            "Local storage, IndexedDB and a service worker cache pages and recent data so the dashboard can be installed as an app and keep working with a poor connection.",
          ]}
        />
      </LegalSection>

      {/* 11 */}
      <LegalSection id="rights" index={next()} title="Your rights & choices">
        <SubHeading>Consent</SubHeading>
        <p>
          Before any location evidence is submitted, PolyCheck asks you to accept the current
          privacy notice. You may decline. If you do, QR attendance check-in stays unavailable
          to you and you should speak to your instructor about another way to record attendance.
          To withdraw consent later, contact your Institution&rsquo;s PolyCheck administrator or
          Data Protection Officer; check-ins already recorded remain part of the academic record.
        </p>
        <SubHeading>Your rights</SubHeading>
        <p>Under the Data Privacy Act you may, subject to the limits in the law:</p>
        <BulletList
          items={[
            "be informed about how your data is processed, and ask for access to it;",
            "ask for correction of inaccurate data;",
            "object to processing, or ask for your data to be blocked or erased where it is no longer needed;",
            "ask for a copy of your data in a portable format;",
            "claim compensation for damages caused by unlawful processing; and",
            "complain to the National Privacy Commission.",
          ]}
        />
        <p>
          Some records — such as the official attendance decision — are academic records that the
          Institution must keep, so erasure requests may be limited to the parts that are not
          needed for that purpose.
        </p>
        <SubHeading>Contesting an attendance entry</SubHeading>
        <p>
          Students can dispute an attendance entry or submit an excuse request directly in the
          app; the instructor reviews it and the decision is recorded.
        </p>
      </LegalSection>

      {/* 12 */}
      <LegalSection id="changes" index={next()} title="Changes">
        <p>
          We will update this page when the app collects something new or handles data
          differently, and change the “Last updated” date above. If a change affects how your
          location is used, the app will ask you to accept the new notice before location
          evidence is submitted again.
        </p>
      </LegalSection>

      {/* 13 */}
      <LegalSection id="contact" index={next()} title="Contact">
        <p>
          To exercise your rights or ask a question, contact your Institution&rsquo;s PolyCheck
          administrator or Data Protection Officer. Include your student or employee number and
          the specific record you are asking about.
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
