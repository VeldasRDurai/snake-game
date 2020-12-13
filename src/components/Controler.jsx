import React from "react";

const Controler = ({ setSpeed }) => {
    return(
        <div>
            <button onClick={()=>setSpeed(50)} >{"Easy  "}</button>
            <button onClick={()=>setSpeed(30)} >{"Medium"}</button>
            <button onClick={()=>setSpeed(10)} >{"Hard  "}</button>
        </div>
    );
}

export default Controler;