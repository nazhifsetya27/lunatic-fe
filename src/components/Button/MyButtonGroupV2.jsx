import React from 'react'
import MyButton from './MyButton'

function MyButtonGroupV2({ buttons, value, onChange, disabled = false }) {
  return (
    <>
      {buttons && buttons.length && (
        <div className="flex w-max overflow-hidden rounded-lg border border-gray-light/300 shadow-shadows/shadow-xs">
          {buttons.map((e, i) => (
            <div
              key={i}
              onClick={() => {
                if (onChange && !disabled) onChange(e?.value)
              }}
              className={`${
                e?.value === value ? 'bg-gray-light/100' : ''
              } border-border-gray-light/300 border-r px-4 py-2 last:border-0 ${disabled ? 'cursor-not-allowed' : ''}`}
            >
              <MyButton color="secondary" variant="text" disabled={disabled}>
                <p className="text-sm-semibold">{e?.label}</p>
              </MyButton>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default MyButtonGroupV2
