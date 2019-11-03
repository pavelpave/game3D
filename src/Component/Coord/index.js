import React, { Component } from "react";
import { Box } from "@garpix/gengine";

class Coordinat extends Component {
  constructor(props) {
    super();
  }

  arrowRightDown = () => {
    console.log("click");
  };
  render() {
    return (
      <React.Fragment>
        <Box scale={[0.1, 0.1, 500]} color={"#0b4f1c"} />
        <Box
          scale={[0.1, 0.1, 500]}
          color={"red"}
          position={[0, 0, 0]}
          rotation={[0, 90, 0]}
        />
        <Box
          scale={[0.1, 0.1, 500]}
          color={"#fff"}
          position={[0, 0, 0]}
          rotation={[90, 0, 0]}
        />
      </React.Fragment>
    );
  }
}

export default Coordinat;
