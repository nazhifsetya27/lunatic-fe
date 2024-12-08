import React from "react";

const MyStepper = ({ children, activeStep = 0 }) => {
    return (
        <div className="flex flex-col">
            {children && React.Children.map(children, (child, index) => {
                return React.cloneElement(child, {
                    key: index, active: activeStep === child?.props?.value,
                });
            })}
        </div>
    );
};

export default MyStepper;