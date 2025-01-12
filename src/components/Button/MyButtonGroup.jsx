import React from 'react'
import SimpleBar from 'simplebar-react'
import MyButton from './MyButton'

function MyButtonGroup({ buttons, value, onChange }) {
  return (
    <>
      {buttons && buttons.length && (
        <div className="flex w-max overflow-hidden rounded-lg border border-gray-light/300 shadow-shadows/shadow-xs">
          {buttons.map((e, i) => (
            <div
              key={i}
              onClick={() => {
                onChange && onChange(e)
              }}
              className={`${e === value ? 'bg-gray-light/100' : ''} border-border-gray-light/300 border-r px-4 py-2 last:border-0`}
            >
              <MyButton color="secondary" variant="text">
                <p className="text-sm-semibold">{e}</p>
              </MyButton>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default MyButtonGroup
