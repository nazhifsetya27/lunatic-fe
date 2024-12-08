import React from "react";
import SimpleBar from "simplebar-react";
import MyButton from "./MyButton";

const MyArchiveButton = ({ value, onChange = () => {}, isUnavailable }) => {
  return (
    <>
      <div className="w-max flex border border-gray-light/300 rounded-lg shadow-shadows/shadow-xs overflow-hidden">
        <div
          key={"active"}
          onClick={() => {
            onChange(0);
          }}
          className={`${
            0 === value.archive ? "bg-gray-light/50" : ""
          } px-4 py-2 border-r border-border-gray-light/300 last:border-0`}
        >
          <MyButton color={"secondary"} variant={"text"}>
            <p className="text-sm-semibold">Active</p>
          </MyButton>
        </div>
        {isUnavailable && (
          <div
            key={"unavailable"}
            onClick={() => {
              onChange(2);
            }}
            className={`${
              2 === value.archive ? "bg-gray-light/50" : ""
            } px-4 py-2 border-r border-border-gray-light/300 last:border-0`}
          >
            <MyButton color={"secondary"} variant={"text"}>
              <p className="text-sm-semibold">Inactive</p>
            </MyButton>
          </div>
        )}
        <div
          key={"archive"}
          onClick={() => {
            onChange(1);
          }}
          className={`${
            1 === value.archive ? "bg-gray-light/50" : ""
          } px-4 py-2 border-r border-border-gray-light/300 last:border-0`}
        >
          <MyButton color={"secondary"} variant={"text"}>
            <p className="text-sm-semibold">Archived</p>
          </MyButton>
        </div>
      </div>
    </>
  );
};

export default MyArchiveButton;
