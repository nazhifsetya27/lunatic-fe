import React from "react";

const MyBgPatternDecorativeCube = ({ children }) => {
  return (
    <>
      <div className={`w-max relative flex items-center justify-center z-0`}>
        <div className="z-0">{children}</div>
        <div
          className="absolute w-[768px] h-[768px] z-0"
          style={{
            maskImage:
              "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 50%)",
          }}
        >
          <div className="relative w-full h-full z-0">
            <div className="absolute w-full h-full flex flex-col justify-between z-0">
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
            </div>
            <div className="absolute rotate-90 w-full h-full flex flex-col justify-between z-0">
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
              <div class="w-full border border-gray-light/200"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBgPatternDecorativeCube;
