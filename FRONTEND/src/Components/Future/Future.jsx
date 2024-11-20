import React, { useEffect } from "react";
import './Future.css';

const Future = () => {
    useEffect(() => {
        document.title = "In Future";
    }, []); 

    return (
        <div className="future-container">
            <h1>Not Implemented Yet || Coming Soon...</h1>
        </div>
    );
};

export default Future;
