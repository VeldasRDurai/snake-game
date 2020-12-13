import React from "react";
import styled from "styled-components";

const Div = styled.div`
    box-sizing:border-box;
    background-color:${ ({bgcolor}) => bgcolor };
    border:${({needBorder}) => needBorder ? "1px solid black" : "none" };
`;

function Boxes({ value , selectedBox , food , fence }) {
  let needBorder = false;
  let bgcolor = "" ;
  if (selectedBox.some( selectedItem => selectedItem === value )){
    bgcolor = "white";
    needBorder = true ;  
  } else if (value === food) {
    bgcolor = "#f43706";
  } else if (fence.some( fenceItem => fenceItem === value )){
    bgcolor = "brown";
    needBorder = true ;
  } else {
    if ( Math.floor(value/30) % 2 === 0 ){
      bgcolor = (value%2 === 0 ) ? "#a7d948" : "#8ecc39" ;
    } else {
      bgcolor = (value%2 === 0 ) ? "#8ecc39" : "#a7d948" ;
    }
  }
  return (
    <Div bgcolor={bgcolor} needBorder={needBorder} >
    </Div>
  );
}

export default Boxes;
