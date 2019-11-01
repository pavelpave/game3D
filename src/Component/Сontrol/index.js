import React, { Component } from "react";
import Hotkey from "../../utils/Hotkey";

class CreateScene extends Component {
  constructor(props) {
      super()
  }

  arrowRightDown = () => {
      console.log('click')
  }
  render() {
    return (
      <React.Fragment>
        <Hotkey hotkey={{ key: "ArrowRight" }} func={this.arrowRightDown} />
      </React.Fragment>
    );
  }
}

export default CreateScene;
