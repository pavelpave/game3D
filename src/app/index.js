import React from "react";
import {
  Canvas,
  PerspectiveCamera,
  OrbitControls,
  Sky,
  Raycast,
  Box,
  Fog,
  GLTF,
  AmbientLight,
  DirectionalLight
} from "@garpix/gengine";
import Controller from "../Component/Сontrol";
import Coordinat from "../Component/Coord";
import Light from "../Component/Light";
class App extends React.Component {
  constructor(props) {
    super();
    this.intervarTriger = null;
    this.walkAnimationDefault = { clipName: "Default Take" };
    this.walkAnimationRun = { clipName: "02_Sphere_bot_Run_Cycle" };
    this.walkAnimationJump = { clipName: "07_Sphere_bot_Jump" };
    this.state = {
      progressLoadScene: null,
      animation: this.walkAnimationDefault,
      cameraPosition: null,
      defaultCameraPosition: [
        -0.08808457681541951,
        6.638108246454423,
        7.553589613725965
      ],
      defaultCameraRotation: [
        -1.9246447908932862,
        -0.18899892729634254,
        -2.6710866210591657
      ],
      generateRotationBraun: [0, 0, 0],
      heroPosition: [-0.003074992723398668, -1.6, 0.9359746908057779],
      heroRotation: [-5, 0, 0],
      runUp: false,
      runDown: false,
      runLeft: false,
      runRight: false,
      jump: false
    };
  }
  update = callback => {
    let intervalTrigger = callback => {
      console.log(this.state.generateRotationBraun);
      return window.setInterval(() => {
        callback();
      }, 100);
    };
    this.intervarTriger = intervalTrigger(callback);
  };
  stopStep = e => {
    window.clearInterval(this.intervarTriger);
    this.setState({
      animation: this.walkAnimationDefault
    });
  };
  downStep = e => {
    if (this.state.runDown) return;
    if (this.state.jump) return;
    this.setState({
      animation: this.walkAnimationRun,
      runUp: false,
      runDown: true,
      runLeft: false,
      runRight: false
    });
    window.clearInterval(this.intervarTriger);
    this.update(e => {
      this.setState({
        generateRotationBraun: [
          (this.state.generateRotationBraun[0] -= 0.1),
          this.state.generateRotationBraun[0],
          this.state.generateRotationBraun[2]
        ]
      });
    });
  };
  upStep = e => {
    if (this.state.runUp) return;
    if (this.state.jump) return;
    this.setState({
      animation: this.walkAnimationRun,
      runUp: true,
      runDown: false,
      runLeft: false,
      runRight: false
    });
    window.clearInterval(this.intervarTriger);
    this.update(e => {
      this.setState({
        generateRotationBraun: [
          (this.state.generateRotationBraun[0] += 0.1),
          this.state.generateRotationBraun[0],
          this.state.generateRotationBraun[2]
        ]
      });
    });
  };
  rightStep = e => {
    if (this.state.runRight) return;
    if (this.state.jump) return;
    this.setState({
      animation: this.walkAnimationRun,
      runUp: false,
      runDown: false,
      runLeft: false,
      runRight: true
    });
    window.clearInterval(this.intervarTriger);
    this.update(e => {
      this.setState({
        generateRotationBraun: [
          this.state.generateRotationBraun[0],
          (this.state.generateRotationBraun[1] += 0.1),
          this.state.generateRotationBraun[1]
        ]
      });
    });
  };
  leftStep = e => {
    if (this.state.runLeft) return;
    if (this.state.jump) return;
    this.setState({
      animation: this.walkAnimationRun,
      runUp: false,
      runDown: false,
      runLeft: true,
      runRight: false
    });
    window.clearInterval(this.intervarTriger);
    this.update(e => {
      this.setState({
        generateRotationBraun: [
          this.state.generateRotationBraun[0],
          (this.state.generateRotationBraun[1] -= 0.1),
          this.state.generateRotationBraun[1]
        ]
      });
    });
  };
  heroJump = e => {
    let prevAnimatiions = this.state.animation;
    if (this.state.jump) return;
    this.setState({
      animation: this.walkAnimationJump,
      jump: true
    });
    setTimeout(e => {
      console.log(prevAnimatiions);
      this.setState({
        jump: false,
        animation:
          prevAnimatiions === this.walkAnimationRun
            ? this.walkAnimationRun
            : this.walkAnimationDefault
      });
    }, 2500);
  };
  createScene = e => {
    //create scene
    // setInterval(e => {
    //   if (this.state.generateRotationBraun[0] >= 360) {
    //     this.setState({
    //       generateRotationBraun: [0, 0, 0]
    //     });
    //   }
    //   this.setState({
    //     generateRotationBraun: [
    //       (this.state.generateRotationBraun[0] += 1),
    //       (this.state.generateRotationBraun[0] -= 1),
    //       0
    //     ]
    //   });
    // }, 1000 / 15);
  };
  init = e => {
    this.createScene();
  };
  getCameraPosition = pos => {
    this.setState({
      cameraPosition: pos
    });
  };
  componentDidMount() {
    // this.init();
  }
  render() {
    return (
      <div>
        {this.state.progressLoadScene < 100 ? (
          <div className="scene-is__load">
            <h1>{this.state.progressLoadScene}</h1>
          </div>
        ) : null}
        <Canvas
          fullscreen={true}
          onLoadingProgress={progress => {
            this.setState({
              progressLoadScene: progress
            });
          }}
        >
          {/* Camera */}
          <PerspectiveCamera
            minDistance={1}
            maxDistance={2000}
            position={this.state.defaultCameraPosition}
            rotation={[0, 0, 0]}
            getCameraPositions={this.getCameraPosition}
          >
            <Fog near={1} far={30} />
            <OrbitControls />
            <Raycast />
            <Sky url={"/static/textures/background.jpg"} />
          </PerspectiveCamera>
          <Controller
            callBackJump={this.heroJump}
            callBackLeftStep={this.leftStep}
            callBackRightStep={this.rightStep}
            callBackUpStep={this.upStep}
            callBackDownStep={this.downStep}
            callBackStopStep={this.stopStep}
          />
          {/* hero */}
          <GLTF
            url={"/static/gltf/hero/scene.gltf"}
            animation={this.state.animation}
            position={this.state.heroPosition}
            rotation={this.state.heroRotation}
          />
          {/* planet */}
          <GLTF url={"/static/scene.gltf"} />
          <GLTF
            url={"/static/scene.gltf"}
            position={[0, -100, 10]}
            rotation={this.state.generateRotationBraun}
          />
          {/* Coordinate */}
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

          <AmbientLight intensity={0.4} />
          <DirectionalLight intensity={1} />
        </Canvas>
      </div>
    );
  }
}

export default App;
