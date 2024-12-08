import React from "react";
import moment from "moment";
import {
  CsvDefault,
  GifDefault,
  JpgDefault,
  PdfDefault,
  PngDefault,
  XlsDefault,
  XlsxDefault,
} from "../Icon/Extension";
import { formatFileSize } from "../../services/Helper";

const MyMessageSender = ({
  message,
  maxWidth = "442px",
  isSameMinute = false,
  baseUrl,
}) => {
  const parsedDate = moment(message.created_at);
  const now = moment();
  const isToday = parsedDate.isSame(now, "day");
  const timeDiff = now.diff(parsedDate, "minutes");
  const text = message.message;

  //file
  const file = message.chat_file;

  const IconExtension = () => {
    const fileType = file.type;
    switch (fileType) {
      case "image/jpg":
      case "jpg":
      case "image/jpeg":
        return (
          <div className="[&_svg]:fill-white">
            <JpgDefault size={40} />
          </div>
        );
      case "png":
      case "image/png":
        return (
          <div className="[&_svg]:fill-white">
            <PngDefault size={40} />
          </div>
        );
      case "image/gif":
        return <GifDefault size={40} />;
      case "pdf":
      case "application/pdf":
        return (
          <div className="[&_svg]:fill-white">
            <PdfDefault size={40} />
          </div>
        );
      case "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      case "vnd.ms-excel":
      case "xlsx":
      case "application/vnd.ms-excel":
      case "application/xlsx":
        return <XlsDefault size={40} />;
      case "csv":
      case "text/csv":
        return <CsvDefault size={40} />;
      default:
        return <></>;
    }
  };

  let formattedDate;
  if (timeDiff < 1) {
    formattedDate = "Just now";
  } else if (isToday) {
    formattedDate = parsedDate.format("HH:mma");
  } else {
    formattedDate = parsedDate.format("dddd HH:mma");
  }

  const downloadFile = (id) => {
    const baseURL = baseUrl;
    const downloadURL = `${baseURL}/v1/${id}`;
    window.open(downloadURL, "_blank");
  };

  return (
    <div id={message.id} className="flex justify-end w-full message-box">
      <div className="flex justify-end w-4/5" style={{ maxWidth }}>
        <div className="flex flex-col gap-1 min-w-[50px] self-end">
          {!isSameMinute && (
            <div className="flex justify-between items-baseline gap-1">
              <p className="text-gray-light/700 text-sm-medium">You</p>
              <p className="text-xs-regular">{formattedDate}</p>
            </div>
          )}

          {message.message && (
            <div className="bg-brand/600 w-full max-w-max flex flex-col gap-2 px-[14px] py-2.5 rounded-lg rounded-tr-none self-end message-text">
              <div className="flex gap-4 items-end w-full">
                <div className="flex-1 overflow-hidden text-right">
                  <p className="text-md-regular text-white break-words line-clamp-10 message-preview whitespace-pre-line text-start">
                    {text}
                  </p>
                </div>
              </div>
            </div>
          )}

          {file && (
            <div
              className="bg-brand/600 w-full max-w-max flex flex-col gap-2 px-[14px] py-2.5 rounded-lg rounded-tr-none self-end message-text hover:cursor-pointer"
              onClick={() => downloadFile(file.id)}
            >
              <div className="flex gap-4 items-end w-full">
                <div className="flex-1 overflow-hidden text-right">
                  <div className="flex gap-4">
                    <IconExtension />
                    <div className="text-left">
                      <p className="text-sm-medium text-white">{file?.name}</p>
                      <p className="text-sm-regular text-white">
                        {formatFileSize(file?.size)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyMessageSender;
