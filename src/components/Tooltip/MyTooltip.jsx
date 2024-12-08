import { Tooltip } from '@mui/material'
import React, { Fragment } from 'react'

function MyTooltip({ children, target, placement = 'top' }) {
  const styleTooltip = {
    backgroundColor: '#0C111D',
    padding: '12px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px -2px #10182808',
  }

  const styleArray = {
    color: `#0C111D !important`,
  }

  return (
    <Tooltip
      arrow
      placement={placement}
      title={<>{children}</>}
      componentsProps={{
        tooltip: { sx: styleTooltip },
        arrow: { sx: styleArray },
      }}
    >
      {target}
    </Tooltip>
  )
}

export default MyTooltip
