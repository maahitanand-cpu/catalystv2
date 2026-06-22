import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import LogoMark, { ArrowIcon } from "./Logo.jsx";
import { useInViewOnce, rise, stagger, item } from "./anim.js";
import { DISCORD_URL, HACKATHON } from "./site.js";
import maahitPhoto from "./assets/maahit.png";
import namanPhoto from "./assets/naman.png";

const FOUNDERS = [
  {
    photo: maahitPhoto,
    name: "Maahit Anand",
    role: "Founder & Co-President",
    bio: "Maahit builds at the intersection of AI and product, launching consumer apps, SaaS platforms, and exploring how technology creates value at scale. As Founder of SmartStakes Club, he champions analytical thinking and strategic decision-making. Through Catalyst, he connects ambitious students so that ideas become companies and peers accelerate each other.",
  },
  {
    photo: namanPhoto,
    name: "Naman Rathi",
    role: "Co-Founder",
    bio: "Hi I am Naman Rathi, I am a Junior at Mountain House High School. My passion is listening to music and coding. Some of my projects were creating a bot that finds leaked api keys and creating a free SAT practice test website. I believe having a place to discuss ideas with others helps connect with new people and improve projects and experiences.",
  },
];

const WHO = [
  { n: "AI Builders", d: "Shipping models, building with APIs, thinking hard about what intelligence can unlock next." },
  { n: "Future Founders", d: "Mapping your first startup in notebook margins. You know companies are built before they launch." },
  { n: "Problem Solvers", d: "You see broken systems where others accept the status quo. You would rather fix it than complain." },
  { n: "Creators & Operators", d: "Design, product, growth, writing. You turn ideas into things people actually use." },
];

const VALUES = [
  { n: "Build", d: "Ship real projects with peers who treat execution as seriously as ideation. No gatekeeping, no bureaucracy." },
  { n: "Network", d: "The relationships you form here become co-founders, collaborators, and lifelong allies." },
  { n: "Learn", d: "Practical knowledge from people actively building, not theoretical advice from the sidelines." },
  { n: "Launch", d: "From concept to live product. Structure, accountability, and a community that celebrates shipping." },
];

export default function Catalyst() {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const u = scrollY.on("change", v => setNavSolid(v > 60));
    return u;
  }, [scrollY]);

  const go = id => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), menuOpen ? 300 : 0);
  };

  const [heroRef] = useInViewOnce("0px");
  const [whoRef, whoIn] = useInViewOnce();
  const [missionRef, missionIn] = useInViewOnce();
  const [gainRef, gainIn] = useInViewOnce();
  const [foundersRef, foundersIn] = useInViewOnce();
  const [ctaRef, ctaIn] = useInViewOnce();

  const heroY = useTransform(scrollY, [0, 500], [0, 60]);
  const heroO = useTransform(scrollY, [0, 400], [1, 0]);

  const bannerH = navSolid ? 0 : 38;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* HACKATHON BANNER + NAV */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200 }}
      >
        <div style={{ height: bannerH, overflow: "hidden", transition: "height 0.45s cubic-bezier(0.16,1,0.3,1)" }}>
          <a className="hack-banner" href="#/hackathon">
            <span className="hack-dot" />
            <span className="hack-label gold-text">{HACKATHON.name}</span>
            <span className="hack-sub">{HACKATHON.dates} · AI for real problems · Prizes TBA</span>
            <span className="hack-arrow">→</span>
          </a>
        </div>

        <header
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 56px", height: 68,
            background: navSolid ? "rgba(0,0,0,0.94)" : "transparent",
            backdropFilter: navSolid ? "blur(32px) saturate(180%)" : "none",
            borderBottom: navSolid ? "1px solid var(--border)" : "1px solid transparent",
            transition: "background 0.5s, border-color 0.5s, backdrop-filter 0.5s",
          }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: 0 }}
          >
            <LogoMark size={24} />
            <span style={{ fontSize: "0.88rem", fontWeight: 600, letterSpacing: "0.06em", color: "var(--text-bright)", fontFamily: "inherit" }}>
              Catalyst
            </span>
          </button>

          <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button className="nav-link" onClick={() => go("who")}>Who It's For</button>
            <button className="nav-link" onClick={() => go("mission")}>Mission</button>
            <button className="nav-link" onClick={() => go("founders")}>Founders</button>
            <a className="nav-link gold-text" href="#/hackathon" style={{ textDecoration: "none", fontWeight: 600 }}>Hackathon</a>
            <div style={{ width: 1, height: 16, background: "var(--border)", margin: "0 12px" }} />
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "8px 22px", fontSize: "0.68rem" }}>
              Apply
            </a>
          </nav>

          <button
            className="hide-desktop"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", padding: 4 }}
            onClick={() => setMenuOpen(v => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </header>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            style={{ position: "fixed", top: 68 + bannerH, left: 0, right: 0, zIndex: 199, background: "rgba(0,0,0,0.97)", backdropFilter: "blur(32px)", borderBottom: "1px solid var(--border)", padding: "28px 40px", display: "flex", flexDirection: "column", gap: 20 }}
          >
            {["who", "mission", "founders"].map(id => (
              <button key={id} className="nav-link" style={{ textAlign: "left", width: "fit-content" }} onClick={() => go(id)}>
                {id === "who" ? "Who It's For" : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            <a className="nav-link gold-text" href="#/hackathon" style={{ textDecoration: "none", fontWeight: 600, width: "fit-content" }}>Hackathon</a>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: "fit-content", marginTop: 8 }}>
              Apply Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#000" }}>
        <motion.div
          ref={heroRef}
          style={{ opacity: heroO, y: heroY, position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", maxWidth: 760 }}
        >
          <motion.div {...rise(0.1)} style={{ display: "flex", justifyContent: "center", marginBottom: 44 }}>
            <LogoMark size={52} animated />
          </motion.div>

          <motion.div {...rise(0.22)} style={{ marginBottom: 24 }}>
            <span className="eyebrow">Est. 2026 &nbsp;·&nbsp; Applications Open</span>
          </motion.div>

          <motion.h1
            {...rise(0.32)}
            style={{ fontSize: "clamp(4rem, 11vw, 8.5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.92, color: "#e8e0d5", marginBottom: 36 }}
          >
            Catalyst
          </motion.h1>

          <motion.p
            {...rise(0.42)}
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.12rem)", color: "var(--text-dim)", lineHeight: 1.85, maxWidth: 440, margin: "0 auto 56px", fontWeight: 300, letterSpacing: "0.01em" }}
          >
            A curated community for student builders working at the frontier of AI, entrepreneurship, and execution.
          </motion.p>

          <motion.div {...rise(0.52)} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Apply to Join
              <ArrowIcon />
            </a>
            <a className="btn-outline" href="#/hackathon">
              Hackathon 2026
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 2 }}
          style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)" }}
        >
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
              <rect x="1" y="1" width="12" height="20" rx="6" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
              <motion.rect
                x="5.5" y="4" width="3" height="5" rx="1.5" fill="rgba(255,255,255,0.35)"
                animate={{ y: [0, 7, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* WHO IT'S FOR */}
      <section id="who" style={{ padding: "140px 56px", maxWidth: 1120, margin: "0 auto" }}>
        <div ref={whoRef}>
          <motion.div variants={stagger} initial="initial" animate={whoIn ? "animate" : "initial"} style={{ marginBottom: 72 }}>
            <motion.div variants={item} style={{ marginBottom: 16 }}>
              <span className="eyebrow">Who It's For</span>
            </motion.div>
            <motion.h2 variants={item} style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.035em", color: "#e8e0d5", maxWidth: 500, lineHeight: 1.08 }}>
              Built for the ones who actually build.
            </motion.h2>
          </motion.div>

          <div className="who-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--border)" }}>
            {WHO.map((w, i) => (
              <motion.div
                key={w.n}
                variants={item} initial="initial" animate={whoIn ? "animate" : "initial"}
                transition={{ delay: i * 0.07 }}
                style={{ background: "var(--bg)", padding: "44px 36px", transition: "background 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--bg)"}
              >
                <div style={{ fontSize: "0.58rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.18em", marginBottom: 28, opacity: 0.6 }}>{String(i+1).padStart(2,"0")}</div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#e8e0d5", letterSpacing: "-0.015em", marginBottom: 16, lineHeight: 1.2 }}>{w.n}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-dim)", lineHeight: 1.8, fontWeight: 300 }}>{w.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="hairline" style={{ maxWidth: 1000, margin: "0 auto 0" }} />

      {/* MISSION */}
      <section id="mission" style={{ padding: "160px 56px", maxWidth: 960, margin: "0 auto" }}>
        <div ref={missionRef}>
          <motion.div variants={stagger} initial="initial" animate={missionIn ? "animate" : "initial"}>
            <motion.span variants={item} className="eyebrow" style={{ display: "block", marginBottom: 24 }}>
              Our Mission
            </motion.span>

            <motion.p
              variants={item}
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.42, color: "#e8e0d5", marginBottom: 60, maxWidth: 720 }}
            >
              Too many sharp students end up in the wrong rooms, surrounded by people who do not take building as seriously as they do.
            </motion.p>

            <motion.div variants={item} className="mission-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, marginBottom: 64 }}>
              <p style={{ fontSize: "0.95rem", color: "var(--text-dim)", lineHeight: 1.9, fontWeight: 300 }}>
                Catalyst started because its founders were obsessed with real problems. Not case studies. Not hackathon pitches. Actual things worth building. They wanted peers who stayed up late because of excitement, not deadlines.
              </p>
              <p style={{ fontSize: "0.95rem", color: "var(--text-dim)", lineHeight: 1.9, fontWeight: 300 }}>
                What emerged is a community where you collaborate without ceremony, learn from people actively shipping, and grow alongside students who hold the same bar. Selective by design, because quality compounds.
              </p>
            </motion.div>

            <motion.div variants={item} className="mission-stats" style={{ display: "flex", borderTop: "1px solid var(--border)", paddingTop: 48 }}>
              {["Collaborate", "Build", "Execute", "Grow"].map((word, i) => (
                <div key={word} className="stat" style={{ flex: 1, paddingRight: 28, borderRight: i < 3 ? "1px solid var(--border)" : "none", paddingLeft: i > 0 ? 28 : 0 }}>
                  <div className="gold-text" style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 8 }}>{word}</div>
                  <div style={{ fontSize: "0.67rem", color: "var(--text-faint)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {["Without ceremony", "Without limits", "Without excuses", "Without ceiling"][i]}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="hairline" style={{ maxWidth: 1000, margin: "0 auto" }} />

      {/* WHAT YOU GAIN */}
      <section id="gain" style={{ padding: "160px 56px", maxWidth: 1120, margin: "0 auto" }}>
        <div ref={gainRef}>
          <motion.div variants={stagger} initial="initial" animate={gainIn ? "animate" : "initial"} style={{ marginBottom: 72 }}>
            <motion.span variants={item} className="eyebrow" style={{ display: "block", marginBottom: 16 }}>What You'll Gain</motion.span>
            <motion.h2 variants={item} style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.035em", color: "#e8e0d5", lineHeight: 1.08 }}>
              Membership accelerates everything.
            </motion.h2>
          </motion.div>

          <div className="gain-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--border)" }}>
            {VALUES.map((v, i) => (
              <motion.div
                key={v.n}
                variants={item} initial="initial" animate={gainIn ? "animate" : "initial"}
                transition={{ delay: i * 0.08 }}
                style={{ background: "var(--bg)", padding: "52px 36px", position: "relative", overflow: "hidden", transition: "background 0.35s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--bg)"}
              >
                <div style={{ fontSize: "0.58rem", letterSpacing: "0.18em", color: "var(--text-faint)", marginBottom: 24, fontWeight: 500, opacity: 0.7 }}>0{i + 1}</div>
                <h3 style={{ fontSize: "1.7rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#e8e0d5", marginBottom: 18 }}>{v.n}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-dim)", lineHeight: 1.8, fontWeight: 300 }}>{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="hairline" style={{ maxWidth: 1000, margin: "0 auto" }} />

      {/* FOUNDERS */}
      <section id="founders" style={{ padding: "160px 56px", maxWidth: 1040, margin: "0 auto" }}>
        <div ref={foundersRef}>
          <motion.div variants={stagger} initial="initial" animate={foundersIn ? "animate" : "initial"} style={{ marginBottom: 72 }}>
            <motion.span variants={item} className="eyebrow" style={{ display: "block", marginBottom: 16 }}>Founders</motion.span>
            <motion.h2 variants={item} style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.035em", color: "#e8e0d5", lineHeight: 1.08 }}>
              Built by builders.
            </motion.h2>
          </motion.div>

          <div className="founders-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)" }}>
            {FOUNDERS.map((f, i) => (
              <motion.div
                key={f.name}
                variants={item} initial="initial" animate={foundersIn ? "animate" : "initial"}
                transition={{ delay: i * 0.1 }}
                style={{ background: "var(--bg)", overflow: "hidden" }}
              >
                <div style={{ height: 320, position: "relative", overflow: "hidden", background: "#000" }}>
                  <img
                    src={f.photo}
                    alt={f.name}
                    loading="lazy"
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover",
                      objectPosition: "center 18%",
                      display: "block",
                      filter: "grayscale(20%) contrast(1.08) brightness(0.82) saturate(0.9)",
                    }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)" }} />
                </div>
                <div style={{ padding: "36px 40px 44px", borderTop: "1px solid var(--border)" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.025em", color: "#e8e0d5", marginBottom: 6 }}>{f.name}</h3>
                  <div style={{ fontSize: "0.63rem", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", fontWeight: 500, marginBottom: 20, opacity: 0.8 }}>{f.role}</div>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-dim)", lineHeight: 1.85, fontWeight: 300 }}>{f.bio}</p>
                </div>
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
            <motion.span variants={item} className="eyebrow" style={{ display: "block", marginBottom: 24 }}>Applications Open</motion.span>
            <motion.h2 variants={item} style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.97, color: "#e8e0d5", marginBottom: 32 }}>
              Ready to build
              <br />
              <span className="gold-text gold-anim" style={{ fontStyle: "italic", display: "inline-block", padding: "0.05em 0.12em" }}>something real?</span>
            </motion.h2>
            <motion.p variants={item} style={{ fontSize: "1rem", color: "var(--text-dim)", maxWidth: 380, margin: "0 auto 52px", lineHeight: 1.85, fontWeight: 300 }}>
              Membership is selective. We are looking for people who ship, who think clearly, and who make every room better.
            </motion.p>
            <motion.div variants={item}>
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.78rem", padding: "16px 52px" }}>
                Join Catalyst
                <ArrowIcon />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "36px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LogoMark size={18} />
          <span style={{ fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.05em", color: "rgba(232,224,213,0.3)" }}>Catalyst</span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap", rowGap: 14 }}>
          {[["Who It's For","who"],["Mission","mission"],["Founders","founders"]].map(([label, id]) => (
            <button key={id} onClick={() => go(id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.67rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", fontFamily: "inherit", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--text-dim)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-faint)"}
            >{label}</button>
          ))}
          <a href="#/hackathon" style={{ fontSize: "0.67rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", fontFamily: "inherit", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text-dim)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-faint)"}
          >Hackathon</a>
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.67rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontFamily: "inherit", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
          >Discord</a>
        </div>
        <span style={{ fontSize: "0.63rem", color: "var(--text-faint)", letterSpacing: "0.08em" }}>© 2026 Catalyst</span>
      </footer>

    </div>
  );
}
