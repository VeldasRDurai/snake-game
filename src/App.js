import React, { useEffect, useState } from "react";
import Snake from "./components/Snake";

function App() {
  const [ render , setRender ] = useState(true);
  useEffect( () => {
    if(!render){
      setRender(true);
    }
  },[render]);
  return (
    <>
      { render && <Snake setRender={setRender}/>}
    </>
  );
}
export default App;
