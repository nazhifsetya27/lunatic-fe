import React from 'react'
import SimpleBar from 'simplebar-react'
import MyButton from './MyButton'

function MyArchiveButton({ value, onChange = () => {}, isUnavailable }) {
  return (
    <div className="flex w-max overflow-hidden rounded-lg border border-gray-light/300 shadow-shadows/shadow-xs">
      <div
        key="active"
        onClick={() => {
          onChange(0)
        }}
        className={`${
          value.archive === 0 ? 'bg-gray-light/100' : ''
        } border-border-gray-light/300 border-r px-4 py-2 last:border-0`}
      >
        <MyButton color="secondary" variant="text">
          <p className="text-sm-semibold">Active</p>
        </MyButton>
      </div>
      {isUnavailable && (
        <div
          key="unavailable"
          onClick={() => {
            onChange(2)
          }}
          className={`${
            value.archive === 2 ? 'bg-gray-light/100' : ''
          } border-border-gray-light/300 border-r px-4 py-2 last:border-0`}
        >
          <MyButton color="secondary" variant="text">
            <p className="text-sm-semibold">Inactive</p>
          </MyButton>
        </div>
      )}
      <div
        key="archive"
        onClick={() => {
          onChange(1)
        }}
        className={`${
          value.archive === 1 ? 'bg-gray-light/100' : ''
        } border-border-gray-light/300 border-r px-4 py-2 last:border-0`}
      >
        <MyButton color="secondary" variant="text">
          <p className="text-sm-semibold">Archived</p>
        </MyButton>
      </div>
    </div>
  )
}

export default MyArchiveButton
