// Adds texture on backgrounds to make it look like paper.
export function GrainFilter() {
  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.12 0.02"
          />
        </filter>
      </svg>
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ filter: "url(#grain)" }}
      />
    </>
  );
}
