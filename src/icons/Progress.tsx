/* eslint-disable max-len */
import React from "react";

interface ProgressProps {
  id: string;
  progress: number;
  color: "health" | "mana";
}

const COLORS = {
  health: "#B53232",
  mana: "#02BAF5",
};

const Progress: React.FC<ProgressProps> = ({
  id,
  progress,
  color = "health",
}) => (
  <svg
    width="237"
    height="24"
    viewBox="0 0 237 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.77683 1.68978H9.36566L9.11225 2.01358L1.51706 11.7185L1.11002 12.2387L1.51706 12.7588L9.11225 22.4637L9.36566 22.7875H9.77683H227.039H227.45L227.703 22.4637L235.298 12.7588L235.705 12.2387L235.298 11.7185L227.703 2.01358L227.45 1.68978H227.039H9.77683Z"
      fill="#232B31"
      stroke="black"
      stroke-width="1.68782"
    />
    <path
      opacity="0.25"
      d="M226.067 19.7388L15.0004 19.7388C15.0004 19.7388 15.0004 15.2701 15.0004 12.2388C15.0004 9.20749 15.0004 4.73877 15.0004 4.73877L226.067 4.73877L232.156 12.2388L226.067 19.7388Z"
      fill={COLORS[color]}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.95418 0.845947H227.86L236.777 12.2387L227.86 23.6315H8.95418L0.0380859 12.2387L8.95418 0.845947ZM227.038 21.9437H9.77652L2.18134 12.2387L9.77652 2.53377H227.038L234.633 12.2387L227.038 21.9437Z"
      fill="url(#paint0_linear_485_5342)"
    />
    <mask
      id={`mask${id}`}
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="15"
      y="4"
      width="218"
      height="16"
    >
      <rect
        x="15"
        y="4.73877"
        width={progress * 220}
        height="15"
        fill={COLORS[color]}
      />
    </mask>
    <g mask={`url(#mask${id})`}>
      <path
        d="M226.067 19.7388L15.0004 19.7388C15.0004 19.7388 15.0004 15.2701 15.0004 12.2388C15.0004 9.20749 15.0004 4.73877 15.0004 4.73877L226.067 4.73877L232.156 12.2388L226.067 19.7388Z"
        fill={COLORS[color]}
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_485_5342"
        x1="118.407"
        y1="0.845947"
        x2="118.407"
        y2="23.6315"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#F0E0AC" />
        <stop offset="1" stop-color="#715C39" />
      </linearGradient>
    </defs>
  </svg>
);

export default Progress;
