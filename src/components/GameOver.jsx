import React from "react";
import styled , { keyframes } from "styled-components";


const rotate = keyframes`
  from {
    font-size:45px;
  }

  to {
    font-size:90px;
  }
`;
const Div = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    position: fixed;
    height:100vh;
    width:100vw;
    >:nth-child(1){
        display:flex;
        flex-direction:column;
        align-items:center;
        font-size:90px;
        align-text:center;
        animation: ${rotate} 0.5s linear 1;
    }
    >:nth-child(2){
      font-size:20px;
      color:black;
      background-color:#f43706;
      border:2px solid black;
      border-radius:10px;
      &:hover{
        color:yellow;
        background-color:black;
      }
    } 
`;

const GameOver = ({ points , setRender }) => {
    return (
        <Div>
            <div>
              <div>{"GAME OVER"}</div>
              <div>{"Points : " + points }</div>
            </div>
            <div onClick={() => setRender(false) } >NEWGAME</div>
        </Div>
    );
}

export default GameOver;