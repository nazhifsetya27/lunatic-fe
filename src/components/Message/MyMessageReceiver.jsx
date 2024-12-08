import moment from 'moment'
import React from 'react'
import { User01 } from '@untitled-ui/icons-react'
import MyAvatar from '../../components/Avatar/MyAvatar'
import {
  CsvDefault,
  GifDefault,
  JpgDefault,
  PdfDefault,
  PngDefault,
  XlsDefault,
  XlsxDefault,
} from '../Icon/Extension'
import { formatFileSize } from '../../services/Helper'
import { useTicketing } from '../../pages/Ticketing/context'

const MyMessageReceiver = ({
  message,
  maxWidth = '508px',
  isSameMinute = false,
  baseUrl,
}) => {
  const user = message.ticket_pic.user
  const parsedDate = moment(message.created_at)
  const now = moment()
  const isToday = parsedDate.isSame(now, 'day')
  const timeDiff = now.diff(parsedDate, 'minutes')

  const { onlineStatuses, getOnlineStatus } = useTicketing()

  //file
  const file = message.chat_file

  const IconExtension = () => {
    const fileType = file.type
    switch (fileType) {
      case 'image/jpg':
      case 'jpg':
      case 'image/jpeg':
        return (
          <div className="[&_svg]:fill-white">
            <JpgDefault size={40} />
          </div>
        )
      case 'png':
      case 'image/png':
        return (
          <div className="[&_svg]:fill-white">
            <PngDefault size={40} />
          </div>
        )
      case 'image/gif':
        return <GifDefault size={40} />
      case 'pdf':
      case 'application/pdf':
        return (
          <div className="[&_svg]:fill-white">
            <PdfDefault size={40} />
          </div>
        )
      case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'vnd.ms-excel':
      case 'xlsx':
      case 'application/vnd.ms-excel':
      case 'application/xlsx':
        return <XlsDefault size={40} />
      case 'csv':
      case 'text/csv':
        return <CsvDefault size={40} />
      default:
        return <></>
    }
  }

  let formattedDate
  if (timeDiff < 1) {
    formattedDate = 'Just now'
  } else if (isToday) {
    formattedDate = parsedDate.format('HH:mma')
  } else {
    formattedDate = parsedDate.format('dddd HH:mma')
  }

  const downloadFile = (id) => {
    const baseURL = baseUrl
    const downloadURL = `${baseURL}/v1/${id}`
    window.open(downloadURL, '_blank')
  }

  const onlineStatus = onlineStatuses?.find(
    (status) => status.user_id === user.id
  )

  // getOnlineStatus();
  // console.log(message);

  return (
    <div id={message.id} className="message-box flex w-11/12 justify-start">
      <div className="flex items-start gap-3">
        <div className="h-10 min-h-[40px] w-10 min-w-[40px]">
          <MyAvatar
            photo={message?.ticket_pic?.user?.photo_url}
            showOnlineStatus={getOnlineStatus(message?.ticket_pic?.user?.id)}
          />
        </div>

        <div className="flex flex-col gap-[6px]">
          {!isSameMinute && (
            <div className="flex w-full items-baseline justify-between gap-1">
              <p className="text-sm-medium line-clamp-1 break-words text-gray-light/700">
                {user?.name}
              </p>
              <p className="text-xs-regular text-gray-light/600">
                {formattedDate}
              </p>
            </div>
          )}

          {message.message && (
            <div className="message-text flex w-full max-w-max flex-col gap-2 rounded-lg rounded-tl-none border border-gray-light/200 bg-gray-light/50 px-[14px] py-2.5">
              <div className="flex w-full items-end gap-4">
                <div className="flex-1 overflow-hidden text-left">
                  <p className="text-md-regular line-clamp-10 message-preview break-words text-gray-light/900">
                    {message.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {file && (
            <div
              className="message-text flex w-full max-w-max flex-col gap-2 rounded-lg rounded-tl-none border border-gray-light/200 bg-gray-light/50 px-[14px] py-2.5 hover:cursor-pointer"
              onClick={() => downloadFile(file.id)}
            >
              <div className="flex w-full items-end gap-4">
                <div className="flex gap-4">
                  <IconExtension />
                  <div className="text-left">
                    <p className="text-sm-medium break-all text-gray-light/700">
                      {file?.name}
                    </p>
                    <p className="text-sm-regular text-gray-light/600">
                      {formatFileSize(file?.size)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyMessageReceiver
