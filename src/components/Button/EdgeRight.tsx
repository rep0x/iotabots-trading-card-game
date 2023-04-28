/* eslint-disable max-len */
import React from 'react'

// eslint-disable-next-line react/require-default-props
const EdgeRight: React.FC<{ color?: string }> = ({ color = '#E8E3D2' }) => (
  <svg width='20' height='40' viewBox='0 0 20 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path opacity='0.5' fillRule='evenodd' clipRule='evenodd' d='M-4.89535e-05 39.9984L7.05259 39.9984L20 19.9992L7.05258 -3.70151e-05L-5.24502e-05 -3.63985e-05L-4.89535e-05 39.9984Z' fill={color} />
    <path fillRule='evenodd' clipRule='evenodd' d='M1.90735e-06 38.0936L5.62298 38.0936L17.3372 19.9993L3.25493e-07 19.9993L1.90735e-06 38.0936Z' fill='#060A12' />
    <path fillRule='evenodd' clipRule='evenodd' d='M-5.62768e-05 19.999L17.3393 19.999L17.3394 19.9989L5.62505 1.90439L-5.78587e-05 1.90439L-5.62768e-05 19.999Z' fill='#060A12' />
    <path fillRule='evenodd' clipRule='evenodd' d='M0.000129801 36.1892L4.19557 36.1892L14.6714 19.9993L4.19557 3.80941L0.00012697 3.80941L0.000129801 36.1892Z' fill={color} />
  </svg>
)

export default EdgeRight