import React, { useEffect, useRef, useState } from 'react'
import SimpleBar from 'simplebar-react'
import { Menu, useMediaQuery } from '@mui/material'
import $ from 'jquery'
import MyPagination from '../Pagination/MyPagination'
import MyDataNotFound from '../NotFound/MyDataNotFound'
import MyLoadingData from '../Loading/MyLoadingData'
import MyMenuItem from './MyMenuItem'
import MyMiniPagination from '../Pagination/MyMiniPagination'

function MyDataTable({
  children,
  values = {},
  paginator = false,
  footerColumnGroup,
  headerColumnGroup,
  onChangePagination,
  selectionMode,
  onSelectionChange,
  onUnselectChange,
  onDeleteAll,
  menuItems = [],
  maxWidthMenu = 240,
  onClick,
  invisibleSelection,
}) {
  const style = {
    '&.MuiPopover-root .MuiPaper-root': {
      boxShadow: '0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
      border: '1px solid #EAECF0',
      borderRadius: '12px',
      width: 'max-content',
      '.MuiList-root.MuiList-padding': {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  }
  const isMobile = useMediaQuery('(max-width:640px)')

  const [anchorPosition, setAnchorPosition] = useState({ top: 0, left: 0 })
  const [isSearchData, setIsSearchData] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [contextMenuValue, setContextMenuValue] = useState(false)
  const [idToBulkDelete, setIdToBulkDelete] = useState([])

  const handleContextMenu = (event, value) => {
    if ((values.data ?? []).some((e) => e.checked)) {
      event.preventDefault()
      setAnchorPosition({ top: event.clientY, left: event.clientX })
      setContextMenuValue(value)
      setIsOpen(true)
    }
  }

  const handleCloseMenu = () => {
    setIsOpen(false)
    setTimeout(() => {
      setContextMenuValue(null)
    }, 200)
  }

  const onChange = (checked, value) => {
    let isCheckedAll = true
    const updatedList = (values.data ?? []).map((item) => {
      if (item.id === value.id) {
        item.checked = checked
      }

      if (!item.checked) {
        isCheckedAll = false
      }

      return item
    })

    const checkedId = updatedList
      .filter((e) => e.checked === true)
      .map((e) => e.id)
    setIdToBulkDelete(checkedId)

    onSelectionChange &&
      onSelectionChange({
        ...values,
        data: updatedList,
        checkedAll: isCheckedAll,
      })

    handleCloseMenu()
  }

  const onChangeAll = (checked) => {
    const updatedList = (values.data ?? []).map((item) => ({
      ...item,
      checked,
    }))

    const checkedId = checked ? updatedList.map((item) => item.id) : []

    setIdToBulkDelete(checkedId)

    onSelectionChange &&
      onSelectionChange({ ...values, data: updatedList, checkedAll: checked })
    handleCloseMenu()
  }

  const onUnselectAll = () => {
    const updatedList = (values.data ?? []).map((item) => ({
      ...item,
      checked: false,
    }))

    setIdToBulkDelete([])

    onSelectionChange &&
      onSelectionChange({ ...values, data: updatedList, checkedAll: false })
    onUnselectChange && onUnselectChange()
  }

  const handleBulkDelete = (idToBulkDelete) => {
    onUnselectAll()
    onDeleteAll && onDeleteAll(idToBulkDelete)
  }

  useEffect(() => {
    if ($('#input-search').length) {
      const val = $('#input-search').val()
      if (val.length) {
        setIsSearchData(true)
      } else {
        setIsSearchData(false)
      }
    }
  }, [values])
  const scrollContentRef = useRef(null) // Reference to the scrollable content
  const scrollThumbRef = useRef(null) // Reference to the scroll thumb
  const [isDragging, setIsDragging] = useState(false) // For dragging state
  const [startX, setStartX] = useState(0) // To track the start X position
  const [startScrollLeft, setStartScrollLeft] = useState(0) // To track the initial scroll position

  // Update the size of the scroll thumb dynamically
  // const updateScrollThumb = () => {
  //   const contentWidth = scrollContentRef.current.scrollWidth
  //   const containerWidth = scrollContentRef.current.clientWidth
  //   const scrollbarWidth = scrollThumbRef.current.parentElement.clientWidth

  //   const thumbWidth = Math.max(
  //     (containerWidth / contentWidth) * scrollbarWidth,
  //     50
  //   )
  //   scrollThumbRef.current.style.width = `${thumbWidth}px`
  // }

  // Sync content scrolling with the floating scrollbar
  const handleScroll = () => {
    const contentWidth =
      scrollContentRef.current.scrollWidth -
      scrollContentRef.current.clientWidth
    const scrollbarWidth =
      scrollThumbRef.current.parentElement.clientWidth -
      scrollThumbRef.current.clientWidth

    const scrollLeft =
      (scrollContentRef.current.scrollLeft / contentWidth) * scrollbarWidth
    scrollThumbRef.current.style.left = `${scrollLeft}px`
  }

  // Handle dragging the scroll thumb
  const handleMouseMove = (e) => {
    if (!isDragging) return

    const deltaX = e.pageX - startX
    const contentWidth =
      scrollContentRef.current.scrollWidth -
      scrollContentRef.current.clientWidth
    const scrollbarWidth =
      scrollThumbRef.current.parentElement.clientWidth -
      scrollThumbRef.current.clientWidth

    const scrollDelta = (deltaX / scrollbarWidth) * contentWidth
    scrollContentRef.current.scrollLeft = startScrollLeft + scrollDelta
  }

  // Initialize dragging
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX)
    setStartScrollLeft(scrollContentRef.current.scrollLeft)
    document.body.classList.add('no-select') // Disable text selection
  }

  // End dragging
  const handleMouseUp = () => {
    setIsDragging(false)
    document.body.classList.remove('no-select') // Re-enable text selection
  }

  // Set up event listeners
  useEffect(() => {
    const scrollContent = scrollContentRef.current

    // Handle resize and initial thumb update
    // updateScrollThumb()
    // window.addEventListener('resize', updateScrollThumb)

    // Handle scroll synchronization
    scrollContent.addEventListener('scroll', handleScroll)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    // Cleanup event listeners on unmount
    return () => {
      // window.removeEventListener('resize', updateScrollThumb)
      scrollContent.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, startX, startScrollLeft])

  return (
    <>
      {values && !values.loading ? (
        <div className="relative">
          <div
            ref={scrollContentRef}
            className="scroll-content min-w-full overflow-x-auto"
          >
            {/* <div className="floating-scrollbar fixed bottom-4 left-0 mx-[100px] h-2 w-full bg-gray-100"> */}
            {/* <div
                ref={scrollThumbRef}
                className="scroll-thumb absolute h-full cursor-pointer rounded-full bg-gray-300"
                onMouseDown={handleMouseDown}
              /> */}
            {/* </div> */}
            <table className="table w-full border-collapse">
              <thead className="border-t border-gray-light/200 p-0">
                {headerColumnGroup &&
                  React.cloneElement(headerColumnGroup, { tag: 'th' })}
                <tr className="hover:bg-gray-light/25">
                  {children &&
                    React.Children.map(children, (child, index) =>
                      React.cloneElement(child, {
                        tag: 'th',
                        values,
                        selectionMode,
                        onChangeAll,
                        index,
                        key: index,
                      })
                    )}
                </tr>
              </thead>
              <tbody>
                {children &&
                  values &&
                  (values?.data ?? []).map((value, i) => (
                    <tr
                      key={i}
                      onContextMenu={(e) => handleContextMenu(e, value)}
                      onClick={(e) => {
                        if ($(e.target).closest('.input-checkbox').length) {
                          return
                        }

                        onClick && onClick(value)
                      }}
                      className="hover:bg-gray-light/25"
                    >
                      {React.Children.map(children, (child, index) =>
                        React.cloneElement(child, {
                          tag: 'td',
                          values,
                          value,
                          selectionMode,
                          onChange,
                          index,
                          i,
                          key: index,
                          invisibleSelection,
                        })
                      )}
                    </tr>
                  ))}
                {footerColumnGroup &&
                  React.cloneElement(footerColumnGroup, { tag: 'td' })}
              </tbody>
            </table>
          </div>

          {values &&
            (values.data ?? []).length !== 0 &&
            (values.data ?? []).some((e) => e.checked) && (
              <Menu
                anchorReference="anchorPosition"
                anchorPosition={anchorPosition}
                sx={style}
                open={isOpen}
                autoFocus={false}
                onClose={handleCloseMenu}
              >
                <div
                  className="flex h-max w-max flex-col gap-1 py-1"
                  style={{ width: `${maxWidthMenu}px` }}
                >
                  {values && (values.data ?? []).some((e) => e.checked) && (
                    <>
                      {menuItems &&
                        menuItems.length !== 0 &&
                        React.Children.map(menuItems, (child, index) => {
                          let isShow = true
                          if (child.props.statusShow && contextMenuValue) {
                            isShow = child.props.statusShow(contextMenuValue)
                          }

                          if (isShow) {
                            return (
                              <>
                                {React.cloneElement(child, {
                                  key: index,
                                  value: contextMenuValue,
                                  handleClose: handleCloseMenu,
                                  values: values.data ?? [],
                                  onClick: () => {
                                    child.props.onClick(idToBulkDelete)
                                  },
                                })}
                                <hr
                                  key={`${index}-hr`}
                                  className="border-gray-light/200"
                                />
                              </>
                            )
                          }
                        })}
                      <MyMenuItem
                        onClick={onUnselectAll}
                        handleClose={handleCloseMenu}
                      >
                        <p className="text-sm-medium text-gray-light/700">
                          Unselect all
                        </p>
                      </MyMenuItem>
                      {onDeleteAll && <hr className="border-gray-light/200" />}
                      {onDeleteAll && (
                        <MyMenuItem
                          onClick={() => handleBulkDelete(idToBulkDelete)}
                          handleClose={handleCloseMenu}
                        >
                          <p className="text-sm-medium text-error/600">
                            Delete all
                          </p>
                        </MyMenuItem>
                      )}
                    </>
                  )}
                </div>
              </Menu>
            )}

          {!paginator ? (
            <></>
          ) : values?.meta?.next_page == null &&
            values?.meta?.current_page === 1 ? (
            <></>
          ) : isMobile ? (
            <MyMiniPagination
              meta={values?.meta}
              onChange={onChangePagination}
            />
          ) : (
            <MyPagination meta={values?.meta} onChange={onChangePagination} />
          )}
          {isSearchData && values?.meta?.total === 0 && (
            <div className="mb-12 mt-28 flex flex-1 justify-center">
              <MyDataNotFound isSearch />
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-[605px] w-full items-center justify-center">
          <MyLoadingData />
        </div>
      )}
    </>
  )
}

export default MyDataTable
