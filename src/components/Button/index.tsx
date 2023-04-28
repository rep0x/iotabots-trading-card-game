/* eslint-disable max-len */
import React from 'react'
import { Box } from '@mui/material'
import { BoxProps } from '@mui/system'
import EdgeRight from './EdgeRight'
import EdgeLeft from './EdgeLeft'
import Background from './Background'

interface ButtonProps extends BoxProps {
  // eslint-disable-next-line react/require-default-props
  color?: 'light' | 'dark' | 'notice' | 'secondary'
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, sx, color = 'light' } = props

  let bgcolor
  let textColor

  switch (color) {
    case 'light':
      bgcolor = '#E8E3D2'
      textColor = '#171714'
      break

    case 'dark':
      bgcolor = '#7E633A'
      textColor = '#F4EEE5'
      break

    case 'secondary':
      bgcolor = '#DECB23'
      textColor = '#171601'
      break

    case 'notice':
      bgcolor = '#238FDE'
      textColor = '#010F1A'
      break

    default:
      bgcolor = '#2F3440'
      textColor = '#DCE3F1'
      break
  }
  return (
    <Box
      {...props}
      sx={{
        ...sx,
        border: 'none',
        height: 40,
        display: 'flex',
        cursor: 'pointer',
      }}
    >
      <EdgeLeft color={bgcolor} />
      <Box
        sx={{
          height: 'inherit',
          position: 'relative',
          px: 3,
          minWidth: 100,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'none',
          fontWeight: 800,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1,
          }}
        >
          <Background color={bgcolor} />
        </Box>
        <Box
          sx={{
            zIndex: 2,
            color: textColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </Box>
      <EdgeRight color={bgcolor} />
    </Box>
  )
}

export default Button
