import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const mterial = new THREE.MeshBasicMaterial({ color: "orange" });

const cube = new THREE.Mesh(geometry, mterial);
scene.add(cube);

// axes helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);
// size
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", (e) => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
);

camera.position.z = 3;
// camera.position.x = 1;
// camera.position.y = 1;
// camera.lookAt(new THREE.Vector3(1, 0, 0));
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(size.width, size.height);

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
