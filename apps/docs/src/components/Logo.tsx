interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ width = 24, height = 24, className }: LogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="5" y="5" width="6" height="6" fill="currentColor" />
      <rect x="13" y="5" width="6" height="6" fill="currentColor" />
      <rect x="5" y="13" width="6" height="6" fill="currentColor" />
      <rect x="13" y="13" width="6" height="6" fill="currentColor" />
    </svg>
  );
}
