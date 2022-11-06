import React from "react";
import { Button, ButtonGroup } from "@mui/material";

export default function GroupedButtons(props) {

  const[count,setCount] = React.useState(1)
  props.setCount(count)
  const handleIncrement = () => {
    setCount(count+1)
  };
  const handleDecrement = () => {
    if (count !=0) {
       setCount(count-1)      
    }
  };
  return(
    <ButtonGroup
      style={{ display: "inline", padding: "10px" }}
      size="small"
      aria-label="small outlined button group"
        >
      <Button onClick={handleDecrement}>-</Button>
      <Button disabled>{count}</Button>
      <Button onClick={handleIncrement}>+</Button>
    </ButtonGroup>
  )

}
