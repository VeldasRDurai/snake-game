import React, { useEffect, useReducer, useState , useRef } from "react";
import styled from "styled-components";
import GameOver from "./GameOver";
import Paused from "./Paused";
// import Controler from "./Controler";
import Boxes from "./Boxes";
import boxes , { eastFence , westFence , northFence , southFence } from "./boxDetails";

const Div = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;
    height:100vh;
    width:100vw;
    outline:none;
    background-color:#348930;
    >:last-child{
        display :grid;
        grid-template-rows: 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh ;
        grid-template-columns: 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh 3vh;
        justify-content:center;
    }
`;

const reduceMovement = (movement,action) => {
    switch(action){
        case "EAST" :
            return (movement === "WEST") ? "WEST" : "EAST";
        case "WEST" :
            return (movement === "EAST") ? "EAST" : "WEST";
        case "NORTH" :
            return (movement === "SOUTH") ? "SOUTH" : "NORTH";
        default :
            return (movement === "NORTH") ? "NORTH" : "SOUTH";
    }
}

const Snake = ({ setRender }) =>  {
    // const [ speed , setSpeed ] = useState(30);
    const refDiv = useRef();
    const [ food , setFood ] = useState({
        location : 0 ,
        isEated  : true
    });
    const [ paused , setPaused ] = useState(false);
    const [ gameOver , setGameOver ] = useState(false);
    const [ selectedBox , setSelectedBox ] = useState([32,33,34]);
    const [ movement , dispatchMovement ] = useReducer(reduceMovement,"EAST");
    useEffect( () => {
        refDiv.current.focus();
    },[]);
    useEffect( () => {
        let head = selectedBox[selectedBox.length-1];
        const isGameOver = () => {
            switch(movement){
                case "WEST" : 
                    return westFence.some( item => item===head ) ? true : false ;
                case "NORTH":
                    return northFence.some( item => item===head ) ? true : false ;
                case "SOUTH":
                    return southFence.some( item => item===head ) ? true : false ;
                default :
                    return eastFence.some( item => item===head ) ? true : false ;
            }
        }
        if( food.isEated ){
            let randomLoc = Math.floor(Math.random() * 900) + 1;
            if (![...selectedBox,...eastFence,...westFence,...northFence,...southFence].some( item => item===randomLoc )){
                setFood( {location:randomLoc,isEated:false} );
            }
        }
        if (!isGameOver() && !gameOver && !paused){
            let interval = setInterval( () => {
                let grow = false;
                let newPre = [];
                let oldPre = [];
                setSelectedBox( (pre) => {
                    oldPre = [...pre] ;
                    newPre = pre.map( (item,index) => {
                        if(index === pre.length-1){
                            switch(movement){
                                case "WEST":
                                    if (food.location === item-1 ){
                                        setFood( {location:0,isEated:true} );
                                        grow=true;
                                    }
                                    if(pre.some( bodyItem => bodyItem===item-1)){
                                        setGameOver(true);
                                    }
                                    return item - 1;
                                case "NORTH":
                                    if (food.location === item-30 ){
                                        setFood( {location:0,isEated:true} );
                                        grow=true;
                                    }
                                    if(pre.some( bodyItem => bodyItem===item-30)){
                                        setGameOver(true);
                                    }
                                    return item - 30;
                                case "SOUTH":
                                    if (food.location === item+30 ){
                                        setFood( {location:0,isEated:true} );
                                        grow=true;
                                    }
                                    if(pre.some( bodyItem => bodyItem===item+30)){
                                        setGameOver(true);
                                    }
                                    return item + 30;
                                default :
                                    if (food.location === item+1 ){
                                        setFood( {location:0,isEated:true} );
                                        grow=true;
                                    }
                                    if(pre.some( bodyItem => bodyItem===item+1)){
                                        setGameOver(true);
                                    }
                                    return item + 1;
                            }
                        }
                        else {
                            return pre[index+1] ;
                        }
                    });
                    return newPre;
                }); 
                if(grow){
                    newPre.unshift(oldPre[oldPre.length-1]);
                    setSelectedBox(newPre);
                }
            },30);
            return () => {
                clearInterval(interval);
            }
        } else if (paused) {
            console.log("game paused");
        }else {
            console.log("gameover");
            setGameOver(true);
        }
    },[selectedBox, food , gameOver , movement , paused ]);
    const movementDetector = (e) => {
        if(!gameOver){
            switch(e.keyCode){
                case 37 :
                    dispatchMovement("WEST")
                    break;
                case 38 :
                    dispatchMovement("NORTH");
                    break;
                case 39 :
                    dispatchMovement("EAST")
                    break;
                case 40 :
                    dispatchMovement("SOUTH")
                    break;
                case 32 :
                    setPaused( pre => pre ? false : true );
                    break;
                default :
                    break;
            }
        }
    }
    return (
    <Div ref={refDiv} onKeyDown={ movementDetector } tabIndex="1" >
        { gameOver && <GameOver points={selectedBox.length} setRender={setRender} />}
        { paused   && <Paused />}
        {/* <Controler setSpeed={setSpeed} /> */}
        <div>
            { boxes.map((item) => {
                return <Boxes key={item} value={item} 
                    selectedBox={selectedBox} 
                    food={food.location} 
                    fence={[...eastFence,...westFence,...northFence,...southFence]} />
            }) }
        </div>
    </Div>
);
}

export default Snake;
