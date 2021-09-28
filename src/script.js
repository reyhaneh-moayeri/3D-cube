import "./style.css";
import * as THREE from "three";

// cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / size.width - 0.5;
  cursor.y = -(e.clientY / size.height - 0.5);
});

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const mterial = new THREE.MeshBasicMaterial({ color: "orange" });

const cube = new THREE.Mesh(geometry, mterial);

// cube.position.z = -3;
// cube.position.x = 1;
// cube.position.y = -1;

// cube.scale.x = 2;

// cube.rotation.x = 1;
// cube.rotation.y = 1;
scene.add(cube);

// const group = new THREE.Group();
// scene.add(group);

// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: "yellow" })
// );
// group.add(cube1);
// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: "orangered" })
// );
// cube1.position.z = -3;

// group.add(cube2);
// cube2.position.x = -2;

// const cube3 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: "pink" })
// );
// cube3.position.x = 2;
// group.add(cube3);

// group.position.y = 1;
// axes helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);
// size
const size = {
  width: 800,
  height: 600,
};

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

const clock = new THREE.Clock();

const loop = () => {
  // animate
  const elapsedTime = clock.getElapsedTime();
  // group.rotation.x += 0.001 * delta;
  // group.position.x = Math.sin(elapsedTime);
  // group.position.y = Math.sin(elapsedTime);
  // group.rotation.x = elapsedTime;
  // camera.lookAt(group.position);

  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  camera.position.y = cursor.y * 3;

  camera.lookAt(new THREE.Vector3());
  // render
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();
