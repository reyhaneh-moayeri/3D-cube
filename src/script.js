import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

// debug UI
const gui = new dat.GUI();

const parameters = {
  color: 0xff0000,
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

// const geometry2 = new THREE.Geometry();
// vertex 1
// const vertex1 = new THREE.Vector3(0, 0, 0);
// geometry2.vertices.push(vertex1);
// // vertrx 2
// const vertex2 = new THREE.Vector3(0, 1, 0);
// geometry2.vertices.push(vertex2);

// // vertex 3
// const vertex3 = new THREE.Vector3(1, 0, 0);
// geometry2.vertices.push(vertex3);

// face
// const face = new THREE.Face3(0, 1, 2);
// geometry2.faces.push(face);

// for (let e = 0; e < 50; e++) {
//   for (let i = 0; i < 3; i++) {
//     geometry2.vertices.push(
//       new THREE.Vector3(
//         (Math.random() - 0.5) * 4.5,
//         (Math.random() - 0.5) * 4.5,
//         (Math.random() - 0.5) * 4.5
//       )
//     );
//   }
//   const verticiesIndex = e * 3;
//   geometry2.faces.push(
//     new THREE.Face3(verticiesIndex, verticiesIndex + 1, verticiesIndex + 2)
//   );
// }

// const positionArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);

// const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
const geometry2 = new THREE.BufferGeometry();
const count = 320;
const positionArray = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 2.5;
}
const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
geometry2.setAttribute("position", positionAttribute);

const material = new THREE.MeshBasicMaterial({
  color: 0xfafafa,
  // wireframe: true,
});

const material2 = new THREE.MeshBasicMaterial({
  color: 0x5f5bed,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
gui.add(cube.position, "y", -3, 3, 0.01);
gui.add(cube.position, "x", -3, 3, 0.01);
gui.add(cube, "visible");
const triangle = new THREE.Mesh(geometry2, material2);
scene.add(triangle);
gui.add(triangle.position, "y", -3, 3, 0.01);
gui.add(triangle.position, "x", -3, 3, 0.01);
gui.add(triangle, "visible");
// gui.add(material, "wireframe");
gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});
gui.addColor(parameters, "color").onChange(() => {
  material2.color.set(parameters.color);
});
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

camera.position.z = 4;
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
