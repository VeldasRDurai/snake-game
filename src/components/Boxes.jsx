import React from "react";
import styled from "styled-components";

const Div = styled.div`
    box-sizing:border-box;
    background-color:${ ({bgcolor}) => bgcolor };
    border:${({needBorder}) => needBorder ? "1px solid black" : "none" };
    >:nth-child(1){
      height:100%;
      width:100%;
      background-color:${ ({extraDivBgcolor}) => extraDivBgcolor};
      border-radius:1.2vh;
      border:2px inset black;
      box-sizing:border-box;
    }
`;

function Boxes({ value , selectedBox , food , fence }) {

  let extraDiv = {
    need : false , 
    bgcolor : ""
  }

  let needBorder = false;
  let bgcolor = "" ;

  if (selectedBox.some( selectedItem => selectedItem === value )){
    extraDiv.need = true;
    // extraDiv.bgcolor = Math.floor(Math.random() * 2) ? "yellow" : "black" ; 
    extraDiv.bgcolor ="yellow";
  } else if (value === food) {
    extraDiv.need = true;
    extraDiv.bgcolor = "#f43706";
  }
  
  if (fence.some( fenceItem => fenceItem === value )){
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
    <Div bgcolor={bgcolor} needBorder={needBorder} extraDivBgcolor={extraDiv.bgcolor} >
      {extraDiv.need && <div></div>}      
    </Div>
  );
}

export default Boxes;
