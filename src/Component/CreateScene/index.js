import React, { Component } from "react";
import { GLTF , Box } from "@garpix/gengine";

class CreateScene extends Component {
  constructor(props) {
    super();
    // this.walkAnimation = { clipName: "Armature|Walk" };
    // this.state = {
    //   animation: this.walkAnimation
    // };
  }

  render() {
    return(
        <GLTF
            // animation={this.state.animation}
            url={"/static/scene.gltf"}
          />    
        // <Box scale={[5, 0.1, 5]} color={'#ff0000'} position={[0, -0.6, 0]} />
    )
  }
}

export default CreateScene;
