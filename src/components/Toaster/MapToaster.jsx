import React from 'react'
import { toast } from 'react-toastify'
import MyButton from '../Button/MyButton'
import MyIconDecorativeOutline from '../Decorative/MyIconDecorativeOutline'
import { CheckCircle, XClose } from '@untitled-ui/icons-react'
import { AlertCircle } from '@untitled-ui/icons-react'
import MyAvatar from '../Avatar/MyAvatar'

const Content = ({
  closeToast,
  toastProps,
  user = {},
  onUndo,
  onDismiss,
  onViewChange,
  onSeeDetail,
}) => {
  return (
    <div className="relative rounded-xl border border-gray-light/300 bg-white p-4 shadow-shadows/shadow-lg">
      <div className="flex gap-4">
        <MyAvatar photo={user.photo_url} size={40} />
        <div>
          <div className="flex items-center gap-[8px] text-black">
            <div className="text-sm-medium text-[#344054]">{user.name}</div>
            <div className="text-xs-regular text-[#475467]">{user.case}</div>
          </div>
          <div className="text-xs-regular text-[#475467]">{user?.address}</div>
        </div>
      </div>
    </div>
  )
}

export const myToaster = (
  data,
  {
    onUndo = null,
    onDismiss = null,
    onViewChange = null,
    onSeeDetail = null,
  } = {}
) => {
  toast(
    <Content
      user={data}
      onUndo={onUndo}
      onDismiss={onDismiss}
      onViewChange={onViewChange}
      onSeeDetail={onSeeDetail}
    />,
    { containerId: 'default' }
  )
  return data
}
