/* eslint-disable max-len */
import React from 'react'

// eslint-disable-next-line react/require-default-props
const EdgeLeft: React.FC<{ color?: string }> = ({ color = '#E8E3D2' }) => (
  <svg width='20' height='40' viewBox='0 0 20 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path opacity='0.5' fillRule='evenodd' clipRule='evenodd' d='M20 0H12.9474L0 19.9992L12.9474 39.9985H20V0Z' fill={color} />
    <path fillRule='evenodd' clipRule='evenodd' d='M20 1.90474H14.377L2.66277 19.9991H20V1.90474Z' fill='#060A12' />
    <path fillRule='evenodd' clipRule='evenodd' d='M20.0001 19.9994L2.66064 19.9994L14.375 38.0939H20.0001V19.9994Z' fill='#060A12' />
    <path fillRule='evenodd' clipRule='evenodd' d='M19.9999 3.8092H15.8044L5.32861 19.9991L15.8044 36.189H19.9999V3.8092Z' fill={color} />
  </svg>

)

export default EdgeLeft