import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import gsap from "gsap";

// const image = new Image();
// const texture = new THREE.Texture(image);
// image.onload = () => {
//   texture.needsUpdate = true;
// };
// image.src = "/textures/door/color.jpg";

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log("onstart");
};

loadingManager.onProgress = () => {
  console.log("progress");
};

loadingManager.onError = () => {
  console.log("error");
};
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/flower.jpg");
// debug UI
const gui = new dat.GUI({ closed: true });

const parameters = {
  color: 0xfafafa,
  spin() {
    gsap.to(cube.rotation, { y: 10, duration: 3, delay: 1, z: 10 });
  },
};
// cursor
// const cursor = {
//   x: 0,
//   y: 0,
// };
// window.addEventListener("mousemove", (e) => {
//   cursor.x = e.clientX / size.width - 0.5;
//   cursor.y = -(e.clientY / size.height - 0.5);
// });

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

const material = new THREE.MeshBasicMaterial({
  map: colorTexture,
  // wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
gui.add(cube.position, "y", -3, 3, 0.01);
gui.add(cube.position, "x", -3, 3, 0.01);
gui.add(cube.position, "z", -3, 3, 0.01);
gui.add(cube, "visible");
gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});
gui.add(parameters, "spin");
// axes helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);
// size
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  // adding webkit to work in safari
  const fullscreen =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreen) {
    if (canvas.requestFullscreen) canvas.requestFullscreen();
    else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
});

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
);

camera.position.z = 2;
// camera.position.x = 1;
// camera.position.y = 1;
// camera.lookAt(new THREE.Vector3(1, 0, 0));
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// const clock = new THREE.Clock();

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const loop = () => {
  // animate
  // const elapsedTime = clock.getElapsedTime();
  // group.rotation.x += 0.001 * delta;
  // group.position.x = Math.sin(elapsedTime);
  // group.position.y = Math.sin(elapsedTime);
  // group.rotation.x = elapsedTime;
  // camera.lookAt(group.position);

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.position.y = cursor.y * 5;

  camera.lookAt(new THREE.Vector3());
  controls.update();
  // render
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();
