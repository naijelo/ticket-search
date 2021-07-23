import React from "react";
// import "./Input.css";

const Input = ({variant = "medium", children, label, ...rest}) => {

    return (
        <div>
            <label>{label}
                <input type="text" 
                    className={`input ${variant}`} 
                    required 
                    {...rest}/>
            </label>
        </div>
    );
}

export default Input;