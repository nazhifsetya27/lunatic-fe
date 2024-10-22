// Libraries
import React from 'react'
import SimpleBar from 'simplebar-react'

function Welcome() {
  return (
    <SimpleBar forceVisible="y" style={{ height: '100vh' }}>
      <main className="flex h-full flex-1 flex-col gap-8">
        <div className="flex flex-1 flex-col place-items-center items-center justify-center">
          {/* <Ingenico width={245} height={20} /> */}
          <p className="display-xs-semibold text-gray-light/900">Welcome!</p>
        </div>
      </main>
    </SimpleBar>
  )
}

export default Welcome
