import React from "react";

const Background = () => {
  return (
    <svg
      className="player-bg"
      width="340"
      height="133"
      viewBox="0 0 340 133"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.592407"
        width="339"
        height="131"
        rx="13.5"
        fill="black"
        fillOpacity="0.5"
        stroke="url(#paint0_linear_535_5417)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_535_5417"
          x1="170"
          y1="0.0924072"
          x2="170"
          y2="132.092"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E3D8BC" />
          <stop offset="1" stopColor="#423221" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Background;
