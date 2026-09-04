import React from "react";

interface StitchDividerProps {
  variant?: "scallop" | "wave" | "stitch-line";
  fillColor?: string; // e.g., "#FAF6F0", "#F5ECE1", "#FDFBF7"
  strokeColor?: string; // e.g., "#C77B58", "#DEB49F"
  flip?: boolean;
  className?: string;
}

export function StitchDivider({
  variant = "scallop",
  fillColor = "#FAF6F0",
  strokeColor = "#DEB49F",
  flip = false,
  className = "",
}: StitchDividerProps) {
  if (variant === "stitch-line") {
    return (
      <div className={`w-full flex items-center justify-center my-6 overflow-hidden ${className}`}>
        <svg
          className="w-full max-w-4xl h-3 opacity-60"
          viewBox="0 0 800 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 6 C200 10, 400 2, 600 9, 800 6"
            stroke={strokeColor}
            strokeWidth="1.75"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div
        className={`w-full overflow-hidden leading-none ${
          flip ? "rotate-180 -mt-1" : "-mb-1"
        } ${className}`}
      >
        <svg
          className="relative block w-full h-8 sm:h-12"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,45 350,-15 500,25 C650,65 850,5 1000,35 C1100,55 1170,20 1200,30 L1200,60 L0,60 Z"
            fill={fillColor}
          />
        </svg>
      </div>
    );
  }

  // Scalloped crochet edge
  return (
    <div
      className={`w-full overflow-hidden leading-none ${
        flip ? "rotate-180 -mt-1" : "-mb-1"
      } ${className}`}
    >
      <svg
        className="relative block w-full h-6 sm:h-8"
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="crochetScallop" width="48" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M0 0 Q24 24 48 0 Z"
              fill={fillColor}
            />
            <path
              d="M0 0 Q24 24 48 0"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.25"
              strokeDasharray="3 3"
              opacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="1200" height="32" fill="url(#crochetScallop)" />
      </svg>
    </div>
  );
}
