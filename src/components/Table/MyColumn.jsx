import React, { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp } from '@untitled-ui/icons-react'
import MyCheckbox from '../Checkbox/MyCheckbox'
import { useApp } from '../../AppContext'

const getDataByField = (data, field) => {
  const fields = field.split('.')
  return fields.reduce(
    (result, f) =>
      result && typeof result === 'object' && f in result ? result[f] : null,
    data
  )
}

function MyColumn({
  index,
  i,
  tag,
  header,
  headerBody,
  field,
  body,
  value,
  values,
  onChange,
  onChangeAll,
  colSpan = 1,
  sortable,
  onSort,
  selectionMode,
  alignment = 'left',
  width,
  padding,
  isArchived,
  invisibleSelection,
  valign = '', // top, middle, bottom
  hideCheckboxBody = false,
}) {
  const [sort, setSort] = useState()
  const getClassAlignment = useMemo(() => {
    let className = ''
    if (alignment === 'center') className += 'justify-center text-center'
    else if (alignment === 'left') className += 'justify-start text-left'
    else if (alignment === 'right') className += 'justify-end text-right'
    return className
  }, [alignment])
  const getClassVAlignment = useMemo(() => {
    let className = ''

    if (valign === 'top') className += 'align-top'
    else if (valign === 'middle') className += 'align-middle'
    else if (valign === 'bottom') className += 'align-bottom'

    return className
  }, [valign])

  const { user } = useApp()
  const idUserLogin = user.id

  const isHeader = useMemo(() => tag === 'th', [tag])

  const Tag = isHeader ? 'th' : 'td'
  const handleSort = () => {
    const _sort = sort === 'asc' ? 'desc' : 'asc'
    setSort(_sort)
    onSort && onSort(_sort)
  }

  return (
    <Tag
      colSpan={colSpan}
      width={width}
      onClick={sortable && handleSort}
      className={`${sortable ? 'cursor-pointer' : ''} ${
        padding || 'px-6'
      } py-${isHeader ? 3 : 4} ${isHeader ? '' : ''} ${
        (value?.checked ?? false) ? 'bg-gray-light/50' : ''
      } border-b border-gray-light/200 ${getClassVAlignment}`}
    >
      {isHeader ? (
        <div
          className={`flex h-full w-full items-center gap-3 ${getClassAlignment}`}
        >
          {index === 0 && selectionMode === 'multiple' && (
            <div
              className={`${
                isArchived === 1 ||
                field === 'ticketing_system' ||
                field === 'approval' ||
                field === 'subordinate-approval' ||
                field === 'checklist'
                  ? 'invisible'
                  : ''
              }`}
            >
              <MyCheckbox
                checked={values.checkedAll}
                onChangeForm={({ target: { checked } }) => {
                  onChangeAll(checked)
                }}
              />
            </div>
          )}
          {headerBody || (
            <p className="text-xs-medium whitespace-nowrap text-gray-light/600">
              {header}
            </p>
          )}
          {/* {sortable &&
            (sort === "asc" ? (
              <ArrowUp
                size={16}
                className={"text-gray-light/600"}
                stroke={"currentColor"}
              />
            ) : (
              <ArrowDown
                size={16}
                className={"text-gray-light/600"}
                stroke={"currentColor"}
              />
            ))} */}
        </div>
      ) : (
        <div
          className={`flex h-full w-full items-center gap-3 ${getClassAlignment}`}
        >
          {index === 0 &&
            (selectionMode === 'multiple' || selectionMode === 'single') && (
              <div
                // todo: make this run only if field === "ticket_status"
                className={`${
                  isArchived === 1 ||
                  value.immune ||
                  value.ticket_status === 'Closed' ||
                  (value.ticket_status === 'Open' && !value.pic_ids?.length) ||
                  (field === 'ticket_status' && !value.pic_ids?.length) ||
                  (field === 'approval' &&
                    value?.approver?.id === idUserLogin) ||
                  (invisibleSelection && invisibleSelection(value)) ||
                  hideCheckboxBody
                    ? 'invisible'
                    : ''
                }`}
              >
                <MyCheckbox
                  checked={value.checked}
                  onChangeForm={({ target: { checked } }) => {
                    onChange(checked, value)
                  }}
                />
              </div>
            )}
          {body ? (
            body(value, i)
          ) : (
            <p className="text-sm-regular whitespace-nowrap text-gray-light/600">
              {field && getDataByField(value, field)}
            </p>
          )}
        </div>
      )}
    </Tag>
  )
}

export default MyColumn

/* import React, { useMemo, useState } from "react";
import MyCheckbox from "../Checkbox/MyCheckbox";
import { ArrowDown, ArrowUp } from "@untitled-ui/icons-react";
import { useApp } from "../../AppContext";

const getDataByField = (data, field) => {
  const fields = field.split(".");
  return fields.reduce(
    (result, f) =>
      result && typeof result === "object" && f in result ? result[f] : null,
    data
  );
};

const MyColumn = ({
  index,
  tag,
  header,
  headerBody,
  field,
  body,
  value,
  values,
  onChange,
  onChangeAll,
  colSpan = 1,
  sortable,
  onSort,
  selectionMode,
  alignment = "left",
  width,
  padding,
  isArchived,
  hideHeaderBorder,
}) => {
  const [sort, setSort] = useState();
  const getClassAlignment = useMemo(() => {
    let className = "";
    if (alignment === "center") className += "justify-center text-center";
    else if (alignment === "left") className += "justify-start text-left";
    else if (alignment === "right") className += "justify-end text-right";
    return className;
  }, [alignment]);

  const { user } = useApp();
  const idUserLogin = user.id;

  const isHeader = useMemo(() => {
    return tag === "th" ? true : false;
  }, [tag]);

  const Tag = isHeader ? "th" : "td";
  const handleSort = () => {
    const _sort = sort === "asc" ? "desc" : "asc";
    setSort(_sort);
    onSort && onSort(_sort);
  };

  return (
    <Tag
      colSpan={colSpan}
      width={width}
      onClick={sortable && handleSort}
      className={`${sortable ? "cursor-pointer" : ""} ${
        padding ? padding : "px-6"
      } py-${isHeader ? 3 : 4} ${isHeader && hideHeaderBorder ? "border-0" : "border-b"} ${
        isHeader ? "" : ""} ${
        value?.checked ?? false ? "bg-gray-light/50" : ""
      } border-gray-light/200`}
    >
      {isHeader ? (
        <div
          className={`w-full h-full flex items-center gap-3 ${getClassAlignment}`}
        >
          {index === 0 && selectionMode === "multiple" && (
            <div
              className={`${
                isArchived === 1 ||
                field === "ticketing_system" ||
                field === "approval" ||
                field === "subordinate-approval"
                  ? " invisible"
                  : ""
              }`}
            >
              <MyCheckbox
                checked={values.checkedAll}
                onChangeForm={({ target: { checked } }) => {
                  onChangeAll(checked);
                }}
              />
            </div>
          )}
          {headerBody ? (
            headerBody
          ) : (
            <p className="text-xs-medium text-gray-light/600 whitespace-nowrap">
              {header}
            </p>
          )}
          {sortable &&
            (sort === "asc" ? (
              <ArrowUp
                size={16}
                className={"text-gray-light/600"}
                stroke={"currentColor"}
              />
            ) : (
              <ArrowDown
                size={16}
                className={"text-gray-light/600"}
                stroke={"currentColor"}
              />
            ))}
        </div>
      ) : (
        <div
          className={`w-full h-full flex gap-3 items-center  ${getClassAlignment}`}
        >
          {index === 0 &&
            (selectionMode === "multiple" || selectionMode === "single") && (
              <div
                className={`${
                  isArchived === 1 ||
                  value.ticket_status === "Closed" ||
                  (value.ticket_status === "Open" && !value.pic_ids) ||
                  (field === "ticket_status" && !value?.pic_ids)
                    ? "invisible"
                    : ""
                }`}
              >
                <MyCheckbox
                  checked={value.checked}
                  onChangeForm={({ target: { checked } }) => {
                    onChange(checked, value);
                  }}
                />
              </div>
            )}
          {body ? (
            body(value, index)
          ) : (
            <p className="text-sm-regular text-gray-light/600 whitespace-nowrap">
              {field && getDataByField(value, field)}
            </p>
          )}
        </div>
      )}
    </Tag>
  );
};

export default MyColumn;
 */
