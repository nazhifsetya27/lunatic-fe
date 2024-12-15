import React from 'react'

function MyDetailView({ datas = {}, func = {}, field = '' }) {
  const isSerialNumber = field === 'serial_number'
  return (
    <>
      {Object.entries(datas).map(([key, e], index) => {
        const value = func[key] ? func[key](e) : e
        return (
          <div
            key={index}
            className={`flex items-start gap-3 px-4 py-4 ${
              index % 2 === 0 ? 'bg-gray-light/50' : ''
            }`}
          >
            <p className="text-sm-medium flex-1 text-gray-light/900 first-letter:uppercase">
              {key}
            </p>
            <p
              className={`text-right text-sm text-gray-light/600 ${
                isSerialNumber ? 'break-all' : ''
              }`}
            >
              {value}
            </p>
          </div>
        )
      })}
    </>
  )
}

export default MyDetailView
