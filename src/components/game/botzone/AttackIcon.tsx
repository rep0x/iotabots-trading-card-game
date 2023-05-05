import { TRANSITIONS } from "@/theme";
import { Box } from "@mui/material";
import React from "react";

interface Props {
  id: string;
  active?: boolean;
}

const AttackIcon = ({ id, active = false }: Props) => {
  return (
    <Box
      className="attack-icon"
      sx={{
        "& svg": {
          transition: TRANSITIONS[180],
          color: active ? "#229BEC" : "#142320",
        },
        "& .sword": {
          transition: TRANSITIONS[180],
          fill: active ? "white" : "#B19F73",
        },
        "&:hover": {
          "& svg": {
            color: "#229BEC",
          },
          "& .sword": {
            fill: "white",
          },
        },
      }}
    >
      <svg
        width="51"
        height="51"
        viewBox="0 0 51 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50.7207 25.69C50.7207 39.496 39.5287 50.688 25.7227 50.688C11.9166 50.688 0.724609 39.496 0.724609 25.69C0.724609 11.884 11.9166 0.691956 25.7227 0.691956C39.5287 0.691956 50.7207 11.884 50.7207 25.69Z"
          fill={`url(#${id}-path)`}
        />
        <circle
          className="circle"
          cx="25.7223"
          cy="25.6899"
          r="22.9982"
          fill={`url(#${id}-circle)`}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.7223 46.6881C37.3193 46.6881 46.7205 37.2869 46.7205 25.6899C46.7205 14.0929 37.3193 4.69171 25.7223 4.69171C14.1253 4.69171 4.72412 14.0929 4.72412 25.6899C4.72412 37.2869 14.1253 46.6881 25.7223 46.6881ZM25.7223 48.6881C38.4239 48.6881 48.7205 38.3915 48.7205 25.6899C48.7205 12.9884 38.4239 2.69171 25.7223 2.69171C13.0208 2.69171 2.72412 12.9884 2.72412 25.6899C2.72412 38.3915 13.0208 48.6881 25.7223 48.6881Z"
          fill="black"
          fillOpacity="0.66"
        />
        <path
          className="sword"
          d="M24.9604 30.0711L21.4193 26.466C20.687 25.7206 19.4957 25.7206 18.7634 26.466C18.519 26.7149 18.519 27.1184 18.7634 27.3673L24.0752 32.7749C24.3196 33.0238 24.716 33.0238 24.9604 32.7749C25.6927 32.0294 25.6927 30.8166 24.9604 30.0711Z"
        />
        <path
          className="sword"
          d="M19.6491 30.0699L17.8779 31.8731L19.6491 33.6763L21.4204 31.8731L19.6491 30.0699Z"
        />
        <path
          className="sword"
          d="M18.7632 34.5776L16.9924 32.7748C16.2727 32.0421 15.0388 32.5626 15.0386 33.5987V34.6549C15.0386 35.1821 15.2491 35.6595 15.5893 36.0059C15.9295 36.3522 16.3985 36.5665 16.9164 36.5665H17.9538C18.9712 36.5664 19.4826 35.31 18.7632 34.5776Z"
        />
        <path
          className="sword"
          d="M35.6924 14.8193L29.4953 15.7206C29.3401 15.743 29.1988 15.8244 29.0994 15.9477L21.7266 24.9767L23.6322 26.9167L29.3866 21.0584C29.6313 20.8093 30.0272 20.8093 30.2719 21.0584C30.5165 21.3075 30.5166 21.7106 30.2719 21.9597L24.5175 27.8179L26.4231 29.758L35.292 22.2521C35.413 22.1509 35.493 22.007 35.5151 21.849L36.4004 15.5401C36.4566 15.1431 36.0822 14.762 35.6924 14.8193Z"
        />
        <defs>
          <linearGradient
            id={`${id}-path`}
            x1="25.7227"
            y1="0.691956"
            x2="25.7227"
            y2="50.688"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F0E0AC" />
            <stop offset="1" stopColor="#715C39" />
          </linearGradient>
          <radialGradient
            id={`${id}-circle`}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(25.7223 25.6899) rotate(90) scale(22.9982)"
          >
            <stop stopColor={active ? "#254180" : "#142320"} />
            <stop offset="1" stopColor="currentColor" />
          </radialGradient>
        </defs>
      </svg>
    </Box>
  );
};

export default AttackIcon;
