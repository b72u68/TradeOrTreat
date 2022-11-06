import React from "react";
import { Button, ButtonGroup } from "@mui/material";

class GroupedButtons extends React.Component {
  state = { counter: 1 };

  handleIncrement = () => {
    this.setState((state) => ({ counter: state.counter + 1 }));
  };

  handleDecrement = () => {
    this.setState((state) => ({ counter: state.counter - 1 }));
  };
  render() {
    const displayCounter = this.state.counter > 0;

    return (
      <ButtonGroup
        style={{ display: "inline", padding: "10px" }}
        size="small"
        aria-label="small outlined button group"
      >
        {displayCounter && <Button onClick={this.handleDecrement}>-</Button>}
        {displayCounter && <Button disabled>{this.state.counter}</Button>}
        <Button onClick={this.handleIncrement}>+</Button>
      </ButtonGroup>
    );
  }
}

export default GroupedButtons;
