import React from "react";
import {
  Canvas,
  PerspectiveCamera,
  OrbitControls,
  Sky,
  Raycast,
  Box,
  GLTF,
  AmbientLight,
  DirectionalLight
} from "@garpix/gengine";
// import CreateScene from "../Component/CreateScene";
import Light from "../Component/Light";
class App extends React.Component {
  constructor(props) {
    super();
    this.walkAnimation = { clipName: "Armature|Walk" };
    this.state = {
      animation: this.walkAnimation,
      sceneWidth: null,
      sceneHeight: null,
      camera: null,
      scene: null,
      renderer: null,
      dom: null,
      sun: null,
      ground: null,
      rollingGroundSphere: null,
      heroSphere: null,
      rollingSpeed: 0.008,
      heroRollingSpeed: null,
      worldRadius: 26,
      heroRadius: 0.2,
      sphericalHelper: null,
      pathAngleValues: null,
      heroBaseY: 1.8,
      bounceValue: 0.1,
      gravity: 0.005,
      leftLane: -1,
      rightLane: 1,
      middleLane: 0,
      currentLane: null,
      clock: null,
      jumping: null,
      treeReleaseInterval: 0.5,
      lastTreeReleaseTime: 0,
      treesInPath: null,
      treesPool: null,
      particleGeometry: null,
      particleCount: 20,
      explosionPower: 1.06,
      particles: null,
      scoreText: null,
      score: null,
      hasCollided: null
    };
  }
  update = e => {
    //game loop
  };
  createTreesPool = e => {};
  addWorld = e => {};
  addHero = e => {};
  addLight = e => {};
  addExplosion = e => {};
  createScene = e => {
    //create scene
    this.setState({
      hasCollided: false,
      score: 0,
      treesInPath: [],
      treesPool: [],
      heroRollingSpeed:
        (this.state.rollingSpeed * this.state.worldRadius) /
        this.state.heroRadius /
        5,
      sphericalHelper: "test", //todo прицепить сферу
      pathAngleValues: [1.52, 1.57, 1.62],
      sceneWidth: window.innerWidth,
      sceneHeight: window.innerHeight,
      scene: "test", //todo  инициализация канваса или сцены
      fog: "test", //todo инициализация тумана
      camera: "test", //todo  инициализация камеры
      renderer: "test" //todo renderer with transparent backdrop
    });
    this.createTreesPool();
    this.addWorld();
    this.addHero();
    this.addLight();
    this.addExplosion();
    // hasCollided=false;
    // score=0;
    // treesInPath=[];
    // treesPool=[];
    // clock=new THREE.Clock();
    // clock.start();
    // heroRollingSpeed=(rollingSpeed*worldRadius/heroRadius)/5;
    // sphericalHelper = new THREE.Spherical();
    // pathAngleValues=[1.52,1.57,1.62];
    //   sceneWidth=window.innerWidth;
    //   sceneHeight=window.innerHeight;
    //   scene = new THREE.Scene();//the 3d scene
    //   scene.fog = new THREE.FogExp2( 0xf0fff0, 0.14 );
    //   camera = new THREE.PerspectiveCamera( 60, sceneWidth / sceneHeight, 0.1, 1000 );//perspective camera
    //   renderer = new THREE.WebGLRenderer({alpha:true});//renderer with transparent backdrop
    //   renderer.setClearColor(0xfffafa, 1);
    //   renderer.shadowMap.enabled = true;//enable shadow
    //   renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //   renderer.setSize( sceneWidth, sceneHeight );
    //   dom = document.getElementById('TutContainer');
    // dom.appendChild(renderer.domElement);
    // //stats = new Stats();
    // //dom.appendChild(stats.dom);
    // createTreesPool();
    // addWorld();
    // addHero();
    // addLight();
    // addExplosion();

    // camera.position.z = 6.5;
    // camera.position.y = 2.5;
    // /*orbitControl = new THREE.OrbitControls( camera, renderer.domElement );//helper to rotate around in scene
    // orbitControl.addEventListener( 'change', render );
    // orbitControl.noKeys = true;
    // orbitControl.noPan = true;
    // orbitControl.enableZoom = false;
    // orbitControl.minPolarAngle = 1.1;
    // orbitControl.maxPolarAngle = 1.1;
    // orbitControl.minAzimuthAngle = -0.2;
    // orbitControl.maxAzimuthAngle = 0.2;
    // */
    // window.addEventListener('resize', onWindowResize, false);//resize callback

    // document.onkeydown = handleKeyDown;

    // scoreText = document.createElement('div');
    // scoreText.style.position = 'absolute';
    // //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
    // scoreText.style.width = 100;
    // scoreText.style.height = 100;
    // //scoreText.style.backgroundColor = "blue";
    // scoreText.innerHTML = "0";
    // scoreText.style.top = 50 + 'px';
    // scoreText.style.left = 10 + 'px';
    // document.body.appendChild(scoreText);

    // var infoText = document.createElement('div');
    // infoText.style.position = 'absolute';
    // infoText.style.width = 100;
    // infoText.style.height = 100;
    // infoText.style.backgroundColor = "yellow";
    // infoText.innerHTML = "UP - Jump, Left/Right - Move";
    // infoText.style.top = 10 + 'px';
    // infoText.style.left = 10 + 'px';
    // document.body.appendChild(infoText);
  };
  init = e => {
    this.createScene();
    this.update();
  };
  render() {
    return (
      <div>
        <Canvas fullscreen={true}>
          <PerspectiveCamera
            minDistance={1}
            maxDistance={2000}
            position={[0, 5, 2]}
          >
            <OrbitControls />
            <Raycast />
            <Sky url={"/static/textures/background.jpg"} />
          </PerspectiveCamera>
          {/* {this.init()} */}
          {/* <CreateScene /> */}
          <Light />
          <GLTF scale={[100, 100, 0]} animation={this.state.animation} url={"/static/scene.gltf"}  position={[0, -0.05, 0]}/>
          <Box scale={[0.1, 0.1, 500]} color={"#0b4f1c"} position={[0, 0, 0]} />
          <Box scale={[0.1, 0.1, 500]} color={"red"} position={[0, 0, 0]} rotation={[0,90,0]} />
          <Box scale={[0.1, 0.1, 500]} color={"#fff"} position={[0, 0, 0]} rotation={[90,0,0]} />
          <AmbientLight intensity={1} />
          <DirectionalLight intensity={3} rotation={[0, 40, 0]} />
        </Canvas>
      </div>
    );
  }
}

export default App;
