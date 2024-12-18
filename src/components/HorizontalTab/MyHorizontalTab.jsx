import React from 'react'
import SimpleBar from 'simplebar-react'

function MyHorizontalTab({
  children,
  value,
  selectedIsMatchPath,
  onChange,
  type,
  fullwidth,
}) {
  const makeStyle = React.useMemo(() => {
    let className = ''

    if (type === 'underline') {
      className += ' border-b border-gray-light/200 gap-3'
    } else if (type === 'button-white-border') {
      className +=
        ' border border-gray-light/200 bg-gray-light/50 rounded-[10px] p-1 gap-1'
    }

    return className
  }, [type])
  return (
    <div className="no-scrollbar max-w-[100%] overflow-x-auto">
      {/* <SimpleBar forceVisible="x" style={{ maxWidth: "100%" }}> */}
      <div className={`flex min-w-max max-w-full items-center ${makeStyle}`}>
        {children &&
          React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
              selected: value === child?.props?.value,
              onChange,
              type,
              selectedIsMatchPath,
              fullwidth,
              key: index,
            })
          )}
      </div>
      {/* </SimpleBar> */}
    </div>
  )
}

export default MyHorizontalTab
