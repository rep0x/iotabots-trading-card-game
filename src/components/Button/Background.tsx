/* eslint-disable max-len */
import React from "react";

// eslint-disable-next-line react/require-default-props
const Background: React.FC<{ color?: string }> = ({ color = "#E8E3D2" }) => (
  <svg
    width="100%"
    height="40"
    viewBox="0 0 100% 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect opacity="0.5" width="100%" height="40" fill={color} />
    <rect y="1.90002" width="100%" height="36.2" fill="#060A12" />
    <rect y="3.81006" width="100%" height="32.38" fill={color} />
  </svg>
);

export default Background;
