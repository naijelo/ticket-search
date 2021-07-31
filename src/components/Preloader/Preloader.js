import React from "react";
import preloader from "../../assets/img/preloader.gif";

const Preloader = ({...rest}) => {
    return (
        <div {...rest}>
            <img src={preloader} alt=""/>
        </div>
    )
}

export default Preloader;