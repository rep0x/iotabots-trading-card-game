/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-len */
import React from 'react'

interface ProgressProps {
  progress: number
  // eslint-disable-next-line react/require-default-props
  color?: string
}

const Progress: React.FC<ProgressProps> = ({ progress, color = '#02BAF5' }) => (
  <svg width='251' height='37' viewBox='0 0 251 37' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M16.7383 7.84383H16.3271L16.0737 8.16764L8.47848 17.8726L8.07144 18.3927L8.47848 18.9128L16.0737 28.6178L16.3271 28.9416H16.7383H234H234.411L234.665 28.6178L242.26 18.9128L242.667 18.3927L242.26 17.8726L234.665 8.16764L234.411 7.84383H234H16.7383Z' fill='#232B31' stroke='black' strokeWidth='1.68782' />
    <g filter='url(#filter0_d_296_6863)'>
      <path fillRule='evenodd' clipRule='evenodd' d='M15.9161 7H234.822L243.738 18.3928L234.822 29.7856H15.9161L7 18.3928L15.9161 7ZM234 28.0977H16.7384L9.14325 18.3928L16.7384 8.68782H234L241.595 18.3928L234 28.0977Z' fill='url(#paint0_linear_296_6863)' />
    </g>
    <mask id='mask0_296_6863' style={{ maskType: 'alpha' }} maskUnits='userSpaceOnUse' x='12' y='11' width='227' height='15'>
      <rect className='progress-bar' x='12' y='11' width={progress * 227} height='15' fill={color} />
    </mask>
    <g mask='url(#mask0_296_6863)'>
      <path d='M17.6131 11L232.896 11L239 18.5L232.896 26L17.6131 26L12 18.5L17.6131 11Z' fill='#00C2FF' fillOpacity='0.95' />
    </g>
    <defs>
      <filter id='filter0_d_296_6863' x='0.248721' y='0.248721' width='250.241' height='36.2881' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
        <feOffset />
        <feGaussianBlur stdDeviation='3.37564' />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0' />
        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_296_6863' />
        <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_296_6863' result='shape' />
      </filter>
      <linearGradient id='paint0_linear_296_6863' x1='125.369' y1='7' x2='125.369' y2='29.7856' gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F0E0AC' />
        <stop offset='1' stopColor='#715C39' />
      </linearGradient>
    </defs>
  </svg>
)

export default Progress