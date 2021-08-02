import React from "react";

const Input = ({children, label, ...rest}) => {

    return (
        <div>
            <label>{label}
                <input type="text" 
                    className={`input`} 
                    required 
                    {...rest}/>
            </label>
        </div>
    );
}

export default Input;