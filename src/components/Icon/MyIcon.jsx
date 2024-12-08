import React, { useMemo } from 'react'
import * as icons from '@untitled-ui/icons-react'

const MyIcon = ({ name = 'Edit01', size = 10, stroke }) => {
  const Icon = icons[name]
  if (!Icon) {
    console.warn(`Icon "${name}" not found`)
    return null // or return a default icon
  }

  return <Icon size={size} stroke={stroke} />
}

export default MyIcon
