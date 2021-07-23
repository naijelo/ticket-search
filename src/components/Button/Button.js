import React from "react";
// import "./Button.css";

const Button = ( {children, ...rest} ) => {

    return (
        <button {...rest}>
            {children}
        </button>
    )
}

export default Button;