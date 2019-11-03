import React, { Component } from "react";
import Hotkey from "../../utils/Hotkey";

class CreateScene extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <React.Fragment>
        <Hotkey hotkey={{ key: " " }} func={this.props.callBackJump} />
        <Hotkey hotkey={{ key: "a" }} func={this.props.callBackLeftStep} />
        <Hotkey hotkey={{ key: "d" }} func={this.props.callBackRightStep} />
        <Hotkey hotkey={{ key: "w" }} func={this.props.callBackUpStep} />
        <Hotkey hotkey={{ key: "s" }} func={this.props.callBackDownStep} />
        <Hotkey hotkey={{ key: "e" }} func={this.props.callBackStopStep} />
      </React.Fragment>
    );
  }
}

export default CreateScene;
