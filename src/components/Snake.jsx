import React, { useEffect, useReducer, useState , useRef } from "react";
import styled from "styled-components";
import Boxes from "./Boxes";
import boxes , { eastFence , westFence , northFence , southFence } from "./boxDetails";

const Div = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    >:nth-child(1){
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

function Snake() {
    const refDiv = useRef();
    const [ food , setFood ] = useState({
        location : 0 ,
        isEated  : true
    });
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
        if (!isGameOver() && !gameOver){
            let interval = setInterval( () => {
                console.log("mounted");
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
                                        console.log("gameover.....");
                                        setGameOver(true);
                                    }
                                    return item - 1;
                                case "NORTH":
                                    if (food.location === item-30 ){
                                        setFood( {location:0,isEated:true} );
                                        grow=true;
                                    }
                                    if(pre.some( bodyItem => bodyItem===item-30)){
                                        console.log("gameover.....");
                                        setGameOver(true);
                                    }
                                    return item - 30;
                                case "SOUTH":
                                    if (food.location === item+30 ){
                                        setFood( {location:0,isEated:true} );
                                        grow=true;
                                    }
                                    if(pre.some( bodyItem => bodyItem===item+30)){
                                        console.log("gameover.....");
                                        setGameOver(true);
                                    }
                                    return item + 30;
                                default :
                                    if (food.location === item+1 ){
                                        setFood( {location:0,isEated:true} );
                                        grow=true;
                                    }
                                    if(pre.some( bodyItem => bodyItem===item+1)){
                                        console.log("gameover.....");
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
                console.log("unmounted");
                clearInterval(interval);
            }
        } else {
            console.log("gameover.....");
            setGameOver(true);
        }
    },[selectedBox, food , gameOver , movement ]);
    const movementDetector = (e) => {
        if(!gameOver){
            switch(e.keyCode){
                case 37 :
                    console.log("west");
                    dispatchMovement("WEST")
                    break;
                case 38 :
                    console.log("north");
                    dispatchMovement("NORTH");
                    break;
                case 39 :
                    console.log("east");
                    dispatchMovement("EAST")
                    break;
                case 40 :
                    console.log("south");
                    dispatchMovement("SOUTH")
                    break;
                default :
                    console.log("noChange");
                    break;
            }
        } else {
            console.log("no movement any more.....");
        }
    }
    return (
    <Div ref={refDiv} onKeyDown={ movementDetector } tabIndex="1" >
        <div>
            { boxes.map((item) => {
                // let bgcolor = "white";
                // // let bgcolor = selectedBox.some( selectedItem => selectedItem === item ) ? "green" : ( item === food.location ? "blue" : "red" ) ;
                // if (selectedBox.some( selectedItem => selectedItem === item )){
                //     bgcolor = "white";
                // } else if (item === food.location) {
                //     bgcolor = "red";
                // } else if ([...eastFence,...westFence,...northFence,...southFence].some( fenceItem => fenceItem === item )){
                //     bgcolor = "brown"
                // } else {
                //     bgcolor = "green"
                // }
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
