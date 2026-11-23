export function LogoMark({ className = "w-8 text-brand" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" role="img" aria-label="Kasa" className={`h-auto ${className}`}>
      <HousePath />
    </svg>
  );
}

export default function Logo({ className = "w-[100px] text-brand" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 32" role="img" aria-label="Kasa" className={`h-auto ${className}`}>
      <text x="0" y="27" fill="currentColor" fontSize="30" fontWeight="700" fontFamily="inherit">
        k
      </text>
      <g transform="translate(17 1)">
        <HousePath />
      </g>
      <text x="45" y="27" fill="currentColor" fontSize="30" fontWeight="700" fontFamily="inherit">
        sa
      </text>
    </svg>
  );
}

function HousePath() {
  return (
    <>
      <path fill="currentColor" d="M2 12 14 2l12 10v16H2V12Z" />
      <path fill="#000" opacity=".18" d="M14 2l12 10v16H14V2Z" />
      <path fill="#fff" d="M10 19h5v9h-5z" />
    </>
  );
}
