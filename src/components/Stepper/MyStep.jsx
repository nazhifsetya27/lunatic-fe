import React from "react";

const MyStep = ({ children, stepIcon, value }) => {
    return (
        <div className="flex items-start gap-3">
            <div className="h-full flex flex-col items-center gap-1 pb-1">
                <div className="flex items-center justify-center rounded-full bg-gray-light/100 border-[4px] border-gray-light/50 w-8 h-8 text-gray-light/600">
                    {stepIcon}
                </div>
                <div className="flex-1 bg-gray-light/200 w-0.5 rounded-full"> </div>
            </div>
            <div className="pb-8">
                {children}
            </div>
        </div>
    );
};

export default MyStep;