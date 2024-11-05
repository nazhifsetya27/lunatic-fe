import React from 'react'

function MyBgPatternDecorativeCircle({
  children,
  originClass = 'items-center justify-center',
}) {
  return (
    <div className={`relative flex w-max ${originClass} z-10`}>
      <div className="z-20">{children}</div>
      <div className="bg-gradient-radial absolute flex h-[336px] w-[336px] items-center justify-center">
        <span className="absolute block h-24 w-24 rounded-full border border-gray-light/200" />
        <span className="absolute block h-36 w-36 rounded-full border border-gray-light/200/80" />
        <span className="absolute block h-48 w-48 rounded-full border border-gray-light/200/60" />
        <span className="absolute block h-60 w-60 rounded-full border border-gray-light/200/40" />
        <span className="absolute block h-72 w-72 rounded-full border border-gray-light/200/20" />
        <span className="absolute block h-[336px] w-[336px] rounded-full" />
      </div>
    </div>
  )
}

export default MyBgPatternDecorativeCircle
