import React from 'react'
import { toast } from 'react-toastify'
import { CheckCircle, XClose, AlertCircle } from '@untitled-ui/icons-react'
import MyButton from './MyButton'
import MyIconDecorativeOutline from './MyIconDecorativeOutline'

function Content({
  closeToast,
  toastProps,
  response = {},
  onUndo,
  onDismiss,
  onViewChange,
  onSeeDetail,
}) {
  const toasterIcon = React.useMemo(() => {
    if (
      response?.status === 200 ||
      response?.status === 201 ||
      response?.status === '200' ||
      response?.status === '201'
    ) {
      return (
        <MyIconDecorativeOutline color="success">
          <CheckCircle size={20} stroke="currentColor" />
        </MyIconDecorativeOutline>
      )
    }
    if (response?.status === 500 || response?.status === '500') {
      return (
        <MyIconDecorativeOutline color="warning">
          <AlertCircle size={20} stroke="currentColor" />
        </MyIconDecorativeOutline>
      )
    }

    return <></>
  }, [response])

  return (
    <div className="relative rounded-xl border border-gray-light/300 bg-white p-4 shadow-shadows/shadow-lg">
      <button
        onClick={closeToast}
        className="absolute right-0 top-0 p-2 text-gray-light/400"
      >
        <XClose size={20} stroke="currentColor" />
      </button>
      <div className="flex items-start gap-4">
        {toasterIcon && <div>{toasterIcon}</div>}
        <div className="flex w-full flex-col gap-3">
          <div className="flex w-full flex-col gap-y-1">
            <p className="text-sm-semibold text-gray-light/900">
              {response?.title ?? 'Information'}
            </p>
            <p
              className="text-sm-regular line-clamp-2 whitespace-pre-line text-gray-light/700"
              dangerouslySetInnerHTML={{ __html: response?.message ?? '-' }}
            />
          </div>
          {(onDismiss || onViewChange || onUndo || onSeeDetail) && (
            <div className="flex w-full items-center gap-x-3">
              {onDismiss && (
                <MyButton onClick={closeToast} color="gray" variant="text">
                  <p className="text-sm-semibold">Dismiss</p>
                </MyButton>
              )}
              {onViewChange && (
                <MyButton color="primary" variant="text">
                  <p className="text-sm-semibold">View changes</p>
                </MyButton>
              )}
              {onSeeDetail && (
                <MyButton onClick={onSeeDetail} color="primary" variant="text">
                  <p className="text-sm-semibold">See detail</p>
                </MyButton>
              )}
              {onUndo && (
                <MyButton color="primary" variant="text">
                  <p className="text-sm-semibold">Undo action</p>
                </MyButton>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const myToaster = (
  response,
  {
    onUndo = null,
    onDismiss = null,
    onViewChange = null,
    onSeeDetail = null,
  } = {}
) => {
  // console.log("response", response);
  toast(
    <Content
      response={response}
      onUndo={onUndo}
      onDismiss={onDismiss}
      onViewChange={onViewChange}
      onSeeDetail={onSeeDetail}
    />,
    { containerId: 'default' }
  )
  return response
}
