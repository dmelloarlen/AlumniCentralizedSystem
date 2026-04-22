import PieChart from "./UI/PieChart";

const pieData = {
  labels: ["connectedAlumnis", "unconnectedAlumnis"],
  datasets: [
    {
      label: "Alumni Connection Status",
      data: [90, 10],
      backgroundColor: ["#34D399", "#F87171"],
    },
  ],
};

export default function Landing() {
  return (
    <div>
      {/* HERO */}
      <section className="grid gap-6 bg-gradient-to-br from-slate-50 via-slate-100 to-sky-50 p-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col justify-center gap-6">
          <span className="inline-flex rounded-full bg-slate-900/5 px-4 py-2 text-sm font-medium text-slate-900 ring-1 ring-slate-200">
            Alumni Centralized System
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
              Welcome to your alumni analytics hub.
            </h1>
            <p className="max-w-xl text-slate-600">
              Track engagement, grow your network, and get real mentorship — all
              in one place.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-900">
                Connected alumni
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">4,382</p>
            </div>
            <div className="rounded-3xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-900">
                Active cohorts
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">28</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="h-[28rem] w-full max-w-lg">
            <PieChart data={pieData} />
          </div>
        </div>
      </section>

      {/* 🔥 FEATURE SECTIONS (FULL WIDTH CARDS) */}
      {/* 1 */}
      <section className="mt-10 px-8">
        <div className="   rounded-3xl bg-blue-50 p-10 shadow-sm ring-1 ring-blue-200 hover:shadow-md transition">
          <h2 className="text-2xl font-semibold text-blue-700 text-center">
            You Are Not Alone in Your Journey
          </h2>
          <p className="mt-4 text-center text-slate-600 max-w-3xl mx-auto">
            Students often feel lost while navigating careers. Our platform
            connects you with alumni who guide, mentor, and support you at every
            step.
          </p>
        </div>
      </section>

      {/* 2 */}
      <section className="mt-10 px-8">
        <div className="rounded-3xl bg-sky-50 p-10 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition">
          <h2 className="text-2xl font-semibold text-slate-900 text-center">
            Ask the Right Person, Not Random People
          </h2>
          <p className="mt-4 text-center text-slate-600 max-w-3xl mx-auto">
            Our smart mentor matching system ensures that your questions reach
            the most relevant alumni, saving time and giving you the right
            direction.
          </p>
        </div>
      </section>

      {/* 3 */}
      <section className="mt-10 px-8">
        <div className="rounded-3xl bg-slate-50 p-10 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition">
          <h2 className="text-2xl font-semibold text-slate-900 text-center">
            Avoid Misinformation from the Internet
          </h2>
          <p className="mt-4 text-center text-slate-600 max-w-3xl mx-auto">
            Not everything online is true. Learn from alumni who share
            real-world insights, actual company expectations, and genuine career
            paths.
          </p>
        </div>
      </section>

      {/* 4 SECURE */}
      <section className="mt-10 px-8">
        <div className="rounded-3xl bg-green-50 p-10 shadow-sm ring-1 ring-green-200 hover:shadow-md transition">
          <h2 className="text-2xl font-semibold text-green-700 text-center">
            Verified & Secure Platform
          </h2>
          <p className="mt-4 text-center text-green-800 max-w-3xl mx-auto">
            No fake profiles. Every alumni is verified by the college admin
            before access is granted. This ensures safety, trust, and protection
            from scams or misuse of personal information.
          </p>
        </div>
      </section>

      {/* 5 INTERNSHIP */}
      <section className="mt-10 px-8">
        <div className="rounded-3xl bg-slate-50 p-10 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition">
          <h2
            className="
        text-2xl font-semibold text-slate-900 text-center"
          >
            Internship Opportunities via Referrals
          </h2>
          <p className="mt-4 text-center text-blue-800 max-w-3xl mx-auto">
            Alumni can directly refer students for internships and
            opportunities, reducing the struggle of searching externally and
            increasing chances of selection.
          </p>
        </div>
      </section>

      {/* 6 CHAT + MEET */}
      <section className="mt-10 px-8">
        <div className="rounded-3xl bg-purple-50 p-10 shadow-sm ring-1 ring-purple-200 hover:shadow-md transition">
          <h2 className="text-2xl font-semibold text-purple-700 text-center">
            Built-in Chat & Meeting System
          </h2>
          <p className="mt-4 text-center text-purple-800 max-w-3xl mx-auto">
            No need for external apps. Students and alumni can chat and schedule
            meetings within the platform, ensuring professional and organized
            interactions.
          </p>
        </div>
      </section>

      <footer className="bg-slate-100 mt-16 px-8 py-10 border-t border-slate-200">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm text-slate-600">
          {/* COLUMN 1 */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Platform</h3>
            <ul className="space-y-2">
              <li>Mentorship</li>
              <li>Alumni Network</li>
              <li>Internships</li>
              <li>Analytics</li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Features</h3>
            <ul className="space-y-2">
              <li>Smart Matching</li>
              <li>Verified Profiles</li>
              <li>Chat & Meetings</li>
              <li>Referral System</li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">For</h3>
            <ul className="space-y-2">
              <li>Students</li>
              <li>Colleges</li>
              <li>Alumni</li>
            </ul>
          </div>

          {/* COLUMN 4 */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Support</h3>
            <ul className="space-y-2">
              <li>Help Center</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 border-t border-slate-200 pt-4">
          <p>© 2026 Alumni Portal. All rights reserved.</p>
          <p>Built by Arlen • Fahad • Hamza • Hansy</p>
        </div>
      </footer>
    </div>
  );
}
