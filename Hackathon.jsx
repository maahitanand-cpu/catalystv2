import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LogoMark, { ArrowIcon } from "./Logo.jsx";
import { useInViewOnce, rise, stagger, item } from "./anim.js";
import { DISCORD_URL, HACKATHON } from "./site.js";

const TRACKS = [
  { n: "Education", d: "Tools that make learning easier, faster, or more personal. Study helpers, tutoring bots, or tools that save teachers time." },
  { n: "Health", d: "Tools that help people understand or improve their health. Mental health, fitness, or finding the right care." },
  { n: "Productivity", d: "Cut out busywork. Automate boring tasks and help people get their time back." },
  { n: "Accessibility", d: "Build for everyone. AI that removes barriers for people with vision, hearing, mobility, or learning challenges." },
  { n: "Local Communities", d: "Solve a problem you can see in your own town. Small businesses, schools, neighborhoods, or local events." },
];

const TIMELINE = [
  { t: HACKATHON.kickoff, n: "Kickoff", d: "We go over the theme and the rules, then help you form teams in the Discord. Hacking starts right after." },
  { t: "Friday to Sunday", n: "Build", d: `${HACKATHON.duration} of building. Mentors and organizers are available in Discord the whole time.` },
  { t: HACKATHON.submission, n: "Submissions Close", d: "Turn in a working demo, a short write-up, and a 2 minute video. Done is better than perfect." },
  { t: HACKATHON.demos, n: "Demos & Judging", d: "Show your project live in voice chat. Judges score the projects and winners are announced the same night." },
];

const CRITERIA = [
  { n: "Impact", d: "Does it solve a real problem for real people? Could someone use this tomorrow?" },
  { n: "Execution", d: "Does the demo actually work? A finished, working project beats a big idea with no demo." },
  { n: "Originality", d: "A fresh idea, not a copy of something that already exists. Surprise us." },
  { n: "Use of AI", d: "Is AI a core part of the solution, or just added on top?" },
];

const FAQ = [
  { q: "Who can participate?", a: "Any student. You do not need to be a Catalyst member yet. Joining the Discord is joining the hackathon." },
  { q: "Does it cost anything?", a: "No. Free to enter, free to build, free to win." },
  { q: "What if I don't have a team?", a: "We help you form teams at kickoff. Come alone and leave with a team, or build solo if you prefer." },
  { q: "What can I build with?", a: "Any stack, any model, any API. You cannot use code written before kickoff, but ideas and designs are fine." },
];

export default function Hackathon() {
  const [navSolid, setNavSolid] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const u = scrollY.on("change", v => setNavSolid(v > 60));
    return u;
  }, [scrollY]);

  const [detailsRef, detailsIn] = useInViewOnce();
  const [tracksRef, tracksIn] = useInViewOnce();
  const [timelineRef, timelineIn] = useInViewOnce();
  const [judgeRef, judgeIn] = useInViewOnce();
  const [prizesRef, prizesIn] = useInViewOnce();
  const [faqRef, faqIn] = useInViewOnce();
  const [ctaRef, ctaIn] = useInViewOnce();

  const heroY = useTransform(scrollY, [0, 500], [0, 60]);
  const heroO = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* NAV */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 56px", height: 68,
          background: navSolid ? "rgba(0,0,0,0.94)" : "transparent",
          backdropFilter: navSolid ? "blur(32px) saturate(180%)" : "none",
          borderBottom: navSolid ? "1px solid var(--border)" : "1px solid transparent",
          transition: "background 0.5s, border-color 0.5s, backdrop-filter 0.5s",
        }}
      >
        <a href="#/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <LogoMark size={24} />
          <span style={{ fontSize: "0.88rem", fontWeight: 600, letterSpacing: "0.06em", color: "var(--text-bright)" }}>
            Catalyst
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="#/" className="nav-link" style={{ textDecoration: "none" }}>← Back<span className="hide-mobile"> to Catalyst</span></a>
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "8px 22px", fontSize: "0.68rem" }}>
            Join the Discord
          </a>
        </div>
      </motion.header>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#000", padding: "120px 24px 80px" }}>
        <motion.div style={{ opacity: heroO, y: heroY, position: "relative", zIndex: 2, textAlign: "center", maxWidth: 820 }}>
          <motion.div {...rise(0.1)} style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
            <LogoMark size={44} animated />
          </motion.div>

          <motion.div {...rise(0.2)} style={{ marginBottom: 24 }}>
            <span className="eyebrow">Catalyst Presents &nbsp;·&nbsp; {HACKATHON.dates}</span>
          </motion.div>

          <motion.h1
            {...rise(0.3)}
            style={{ fontSize: "clamp(2.8rem, 9vw, 6.5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.95, color: "#e8e0d5", marginBottom: 32 }}
          >
            Catalyst Hack
            <br />
            <span className="gold-text gold-anim" style={{ fontStyle: "italic", display: "inline-block", padding: "0.05em 0.12em" }}>2026</span>
          </motion.h1>

          <motion.p
            {...rise(0.4)}
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: "var(--text-dim)", lineHeight: 1.85, maxWidth: 560, margin: "0 auto 52px", fontWeight: 300 }}
          >
            {HACKATHON.duration} to build an AI solution that solves a real problem in education,
            health, productivity, accessibility, or local communities. Real problems. Real users. Real demos.
          </motion.p>

          <motion.div {...rise(0.5)} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Join via Discord
              <ArrowIcon />
            </a>
            <a href="#/" className="btn-outline">← Back to Catalyst</a>
          </motion.div>
        </motion.div>
      </section>

      {/* KEY DETAILS */}
      <section style={{ padding: "120px 56px", maxWidth: 1120, margin: "0 auto" }}>
        <div ref={detailsRef}>
          <motion.div variants={stagger} initial="initial" animate={detailsIn ? "animate" : "initial"} style={{ marginBottom: 64 }}>
            <motion.span variants={item} className="eyebrow" style={{ display: "block", marginBottom: 16 }}>The Essentials</motion.span>
            <motion.h2 variants={item} style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.035em", color: "#e8e0d5", lineHeight: 1.08 }}>
              Everything you need to know.
            </motion.h2>
          </motion.div>

          <div className="hack-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--border)" }}>
            {[
              { n: "When", d: HACKATHON.dates, s: `Kickoff ${HACKATHON.kickoff}. ${HACKATHON.duration} of building, demos Sunday evening.` },
              { n: "Where", d: "Online", s: `${HACKATHON.location}. Voice channels for teams, mentors on call, demos live in voice chat.` },
              { n: "Teams", d: "1 – 4 people", s: `${HACKATHON.teamSize}. No team yet? We run team formation at kickoff.` },
              { n: "Cost", d: "Free", s: "Free to enter. All you need is an idea, a laptop, and a weekend." },
            ].map((c, i) => (
              <motion.div
                key={c.n}
                variants={item} initial="initial" animate={detailsIn ? "animate" : "initial"}
                transition={{ delay: i * 0.07 }}
                style={{ background: "var(--bg)", padding: "44px 36px", transition: "background 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--bg)"}
              >
                <div className="eyebrow" style={{ marginBottom: 24 }}>{c.n}</div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#e8e0d5", letterSpacing: "-0.02em", marginBottom: 16 }}>{c.d}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-dim)", lineHeight: 1.8, fontWeight: 300 }}>{c.s}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="hairline" style={{ maxWidth: 1000, margin: "0 auto" }} />

      {/* TRACKS */}
      <section style={{ padding: "140px 56px", maxWidth: 1120, margin: "0 auto" }}>
        <div ref={tracksRef}>
          <motion.div variants={stagger} initial="initial" animate={tracksIn ? "animate" : "initial"} style={{ marginBottom: 64 }}>
            <motion.span variants={item} className="eyebrow" style={{ display: "block", marginBottom: 16 }}>The Challenge</motion.span>
            <motion.h2 variants={item} style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.035em", color: "#e8e0d5", maxWidth: 640, lineHeight: 1.15 }}>
              One theme. Five ways in.
            </motion.h2>
            <motion.p variants={item} style={{ fontSize: "0.95rem", color: "var(--text-dim)", lineHeight: 1.9, fontWeight: 300, maxWidth: 560, marginTop: 24 }}>
              Build an AI solution that solves a real problem. Pick the track where you have seen
              the problem yourself. The best projects come from problems you actually understand.
            </motion.p>
          </motion.div>

          <div className="track-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: "var(--border)" }}>
            {TRACKS.map((t, i) => (
              <motion.div
                key={t.n}
                variants={item} initial="initial" animate={tracksIn ? "animate" : "initial"}
                transition={{ delay: i * 0.07 }}
                style={{ background: "var(--bg)", padding: "40px 28px", transition: "background 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--bg)"}
              >
                <div style={{ fontSize: "0.58rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.18em", marginBottom: 24, opacity: 0.6 }}>{String(i+1).padStart(2,"0")}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#e8e0d5", letterSpacing: "-0.015em", marginBottom: 14, lineHeight: 1.2 }}>{t.n}</h3>
                <p style={{ fontSize: "0.82rem", color: "var(--text-dim)", lineHeight: 1.75, fontWeight: 300 }}>{t.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="hairline" style={{ maxWidth: 1000, margin: "0 auto" }} />

      {/* TIMELINE */}
      <section style={{ padding: "140px 56px", maxWidth: 920, margin: "0 auto" }}>
        <div ref={timelineRef}>
          <motion.div variants={stagger} initial="initial" animate={timelineIn ? "animate" : "initial"} style={{ marginBottom: 64 }}>
            <motion.span variants={item} className="eyebrow" style={{ display: "block", marginBottom: 16 }}>Schedule</motion.span>
            <motion.h2 variants={item} style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.035em", color: "#e8e0d5", lineHeight: 1.08 }}>
              One weekend. Four beats.
            </motion.h2>
          </motion.div>

          <div style={{ borderTop: "1px solid var(--border)" }}>
            {TIMELINE.map((s, i) => (
              <motion.div
                key={s.n}
                variants={item} initial="initial" animate={timelineIn ? "animate" : "initial"}
                transition={{ delay: i * 0.08 }}
                className="timeline-row"
                style={{ display: "grid", gridTemplateColumns: "60px 280px 1fr", gap: 32, padding: "36px 0", borderBottom: "1px solid var(--border)", alignItems: "baseline" }}
              >
                <div className="gold-text" style={{ fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{String(i+1).padStart(2,"0")}</div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#e8e0d5", letterSpacing: "-0.015em", marginBottom: 6 }}>{s.n}</h3>
                  <div style={{ fontSize: "0.63rem", letterSpacing: "0.16em", color: "var(--accent)", textTransform: "uppercase", opacity: 0.7 }}>{s.t}</div>
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--text-dim)", lineHeight: 1.8, fontWeight: 300 }}>{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="hairline" style={{ maxWidth: 1000, margin: "0 auto" }} />

      {/* JUDGING */}
      <section style={{ padding: "140px 56px", maxWidth: 1120, margin: "0 auto" }}>
        <div ref={judgeRef}>
          <motion.div variants={stagger} initial="initial" animate={judgeIn ? "animate" : "initial"} style={{ marginBottom: 64 }}>
            <motion.span variants={item} className="eyebrow" style={{ display: "block", marginBottom: 16 }}>Judging</motion.span>
            <motion.h2 variants={item} style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.035em", color: "#e8e0d5", lineHeight: 1.08 }}>
              What wins.
            </motion.h2>
          </motion.div>

          <div className="hack-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--border)" }}>
            {CRITERIA.map((c, i) => (
              <motion.div
                key={c.n}
                variants={item} initial="initial" animate={judgeIn ? "animate" : "initial"}
                transition={{ delay: i * 0.07 }}
                style={{ background: "var(--bg)", padding: "44px 36px", transition: "background 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--bg)"}
              >
                <div style={{ fontSize: "0.58rem", letterSpacing: "0.18em", color: "var(--text-faint)", marginBottom: 22, fontWeight: 500 }}>0{i+1}</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#e8e0d5", letterSpacing: "-0.02em", marginBottom: 14 }}>{c.n}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-dim)", lineHeight: 1.8, fontWeight: 300 }}>{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="hairline" style={{ maxWidth: 1000, margin: "0 auto" }} />

      {/* PRIZES */}
      <section style={{ padding: "160px 56px", textAlign: "center" }}>
        <div ref={prizesRef}>
          <motion.div variants={stagger} initial="initial" animate={prizesIn ? "animate" : "initial"}>
            <motion.span variants={item} className="eyebrow" style={{ display: "block", marginBottom: 24 }}>Prizes</motion.span>
            <motion.h2 variants={item} className="gold-text gold-anim" style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 28, display: "inline-block", padding: "0.05em 0.12em" }}>
              Announcing soon.
            </motion.h2>
            <motion.p variants={item} style={{ fontSize: "0.95rem", color: "var(--text-dim)", maxWidth: 440, margin: "0 auto", lineHeight: 1.9, fontWeight: 300 }}>
              Prizes will be announced in the near future. We are working on something worth
              building for. Keep an eye on the Discord for the reveal.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="hairline" style={{ maxWidth: 1000, margin: "0 auto" }} />

      {/* FAQ */}
      <section style={{ padding: "140px 56px", maxWidth: 920, margin: "0 auto" }}>
        <div ref={faqRef}>
          <motion.div variants={stagger} initial="initial" animate={faqIn ? "animate" : "initial"} style={{ marginBottom: 64 }}>
            <motion.span variants={item} className="eyebrow" style={{ display: "block", marginBottom: 16 }}>FAQ</motion.span>
            <motion.h2 variants={item} style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.035em", color: "#e8e0d5", lineHeight: 1.08 }}>
              Quick answers.
            </motion.h2>
          </motion.div>

          <div style={{ borderTop: "1px solid var(--border)" }}>
            {FAQ.map((f, i) => (
              <motion.div
                key={f.q}
                variants={item} initial="initial" animate={faqIn ? "animate" : "initial"}
                transition={{ delay: i * 0.06 }}
                className="timeline-row"
                style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 32, padding: "32px 0", borderBottom: "1px solid var(--border)" }}
              >
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#e8e0d5", letterSpacing: "-0.01em" }}>{f.q}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-dim)", lineHeight: 1.8, fontWeight: 300 }}>{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="hairline" style={{ maxWidth: 1000, margin: "0 auto" }} />

      {/* CTA */}
      <section style={{ padding: "180px 56px", textAlign: "center", position: "relative", overflow: "hidden", background: "#000" }}>
        <div ref={ctaRef} style={{ position: "relative", zIndex: 2 }}>
          <motion.div variants={stagger} initial="initial" animate={ctaIn ? "animate" : "initial"}>
            <motion.span variants={item} className="eyebrow" style={{ display: "block", marginBottom: 24 }}>How to Join</motion.span>
            <motion.h2 variants={item} style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.97, color: "#e8e0d5", marginBottom: 32 }}>
              One click.
              <br />
              <span className="gold-text gold-anim" style={{ fontStyle: "italic", display: "inline-block", padding: "0.05em 0.12em" }}>You're in.</span>
            </motion.h2>
            <motion.p variants={item} style={{ fontSize: "1rem", color: "var(--text-dim)", maxWidth: 420, margin: "0 auto 52px", lineHeight: 1.85, fontWeight: 300 }}>
              Registration happens entirely on Discord. Join the server, grab the hackathon role,
              and you will get every announcement and the kickoff link.
            </motion.p>
            <motion.div variants={item} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.78rem", padding: "16px 52px" }}>
                Join the Discord
                <ArrowIcon />
              </a>
              <a href="#/" className="btn-outline" style={{ padding: "16px 36px" }}>← Back to Catalyst</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "36px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LogoMark size={18} />
          <span style={{ fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.05em", color: "rgba(232,224,213,0.3)" }}>Catalyst Hack 2026</span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap", rowGap: 14 }}>
          <a href="#/" style={{ fontSize: "0.67rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text-dim)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-faint)"}
          >← Back to Catalyst</a>
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.67rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
          >Discord</a>
        </div>
        <span style={{ fontSize: "0.63rem", color: "var(--text-faint)", letterSpacing: "0.08em" }}>© 2026 Catalyst</span>
      </footer>

    </div>
  );
}
