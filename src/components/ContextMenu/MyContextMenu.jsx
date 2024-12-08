import React, { forwardRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MyContextMenu = forwardRef(({ children, onHide }, ref) => {
    const [anchorEl, setAnchorEl] = useState(null);
    
    useEffect(() => {
        if (ref) {
            ref.current.show = (event) => {
                setAnchorEl(event?.currentTarget ?? event);
            };
        }


    }, []);

    return (
        <>
            <div ref={ref}></div>

        </>
    );
});


export default MyContextMenu;