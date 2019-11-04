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
  DraggableFirstPersonControls,
  AmbientLight,
  DirectionalLight
} from "@garpix/gengine";
import Controller from "../Component/Сontrol";
import PreViwe from "../Component/PreViwe";
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
        0.03056949447341314,
        2.9624169111589174,
        5.277336746765396
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
      jump: false,
      maxPoollThree: 100,
      threePositions: []
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
    if (this.state.jump) return;
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
          (this.state.generateRotationBraun[0] -= 0.2),
          this.state.generateRotationBraun[0],
          this.state.generateRotationBraun[2]
        ],
        threePositions: this.state.threePositions.map((el, i) => {
          return [(el[0] -= 0.01), el[1], (el[2] -= 0.1)];
        })
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
          (this.state.generateRotationBraun[0] += 0.2),
          this.state.generateRotationBraun[0],
          this.state.generateRotationBraun[2]
        ],
        threePositions: this.state.threePositions.map((el, i) => {
          return [(el[0] += 0.01), el[1], (el[2] += 0.1)];
        })
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
          (this.state.generateRotationBraun[1] += 0.2),
          this.state.generateRotationBraun[1]
        ],
        threePositions: this.state.threePositions.map((el, i) => {
          return [(el[0] -= 0.15), el[1], (el[2] -= 0.01)];
        })
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
          (this.state.generateRotationBraun[1] -= 0.2),
          this.state.generateRotationBraun[1]
        ],
        threePositions: this.state.threePositions.map((el, i) => {
          return [(el[0] += 0.15), el[1], (el[2] += 0.01)];
        })
      });
    });
  };
  heroJump = e => {
    let prevAnimatiions = this.state.animation;
    if (this.state.jump) return;
    this.setState({
      animation: this.walkAnimationJump,
      jump: true,
      runUp: false,
      runDown: false,
      runLeft: false,
      runRight: false
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
  getCameraPosition = pos => {
    this.setState({
      cameraPosition: pos
    });
  };
  generateRandomInteger = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };
  renderThree = e => {
    return this.state.threePositions.map((el, i) => {
      return (
        <GLTF
          key={i}
          url={"/static/gltf/three/scene.gltf"}
          position={[...el]}
          scale={[0.03, 0.03, 0.03]}
        />
      );
    });
  };
  componentDidMount() {
    for (let i = 0; i < this.state.maxPoollThree; i++) {
      this.state.threePositions.push([
        this.generateRandomInteger(-100, 100),
        -4,
        this.generateRandomInteger(-100, 100)
      ]);
    }
  }
  render() {
    return (
      <div>
        {this.state.progressLoadScene < 100 ? (
          <div className="scene-is__load">
            <PreViwe now={this.state.progressLoadScene} />
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
            maxDistance={100}
            position={this.state.defaultCameraPosition}
            rotation={[0, 0, 0]}
            getCameraPositions={this.getCameraPosition}
          >
            <Fog near={3} far={30} />
            {/* <OrbitControls /> */}
            <DraggableFirstPersonControls sensitivity={75} />
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
          {/* three */}
          {this.renderThree()}
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
          <DirectionalLight intensity={0.3} />
        </Canvas>
      </div>
    );
  }
}

export default App;
