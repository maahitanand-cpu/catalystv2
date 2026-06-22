export default function LogoMark({ size = 32, animated = false }) {
  return (
    <svg width={size} height={size * 1.18} viewBox="0 0 40 47" fill="none" style={animated ? { animation: "logo-glow 5s ease-in-out infinite" } : {}}>
      <defs>
        <linearGradient id="lm-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#555"/>
          <stop offset="45%" stopColor="#ccc"/>
          <stop offset="100%" stopColor="#888"/>
        </linearGradient>
        <linearGradient id="lm-b" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#666" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#bbb" stopOpacity="0.5"/>
        </linearGradient>
      </defs>
      <polygon points="20,2 38,12 38,35 20,45 2,35 2,12" fill="none" stroke="url(#lm-a)" strokeWidth="1.3" strokeLinejoin="round"/>
      <polygon points="20,2 38,12 20,18 2,12" fill="url(#lm-b)" opacity="0.55"/>
      <polygon points="20,18 38,12 38,35 20,45" fill="url(#lm-a)" opacity="0.08"/>
      <polygon points="20,18 2,12 2,35 20,45" fill="url(#lm-a)" opacity="0.05"/>
      <line x1="20" y1="2" x2="20" y2="18" stroke="url(#lm-a)" strokeWidth="1" opacity="0.85"/>
      <line x1="2" y1="12" x2="20" y2="18" stroke="url(#lm-a)" strokeWidth="0.7" opacity="0.6"/>
      <line x1="38" y1="12" x2="20" y2="18" stroke="url(#lm-a)" strokeWidth="0.7" opacity="0.6"/>
      <line x1="20" y1="18" x2="20" y2="45" stroke="url(#lm-a)" strokeWidth="0.6" opacity="0.28"/>
      <polygon points="20,7 31,13 20,18 9,13" fill="url(#lm-a)" opacity="0.22"/>
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2.5 6.5h8M8 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
