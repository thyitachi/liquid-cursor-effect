
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

let camera, scene, renderer, material, mouse = new THREE.Vector2();

const canvas = document.getElementById('liquid-cursor');
const width = window.innerWidth;
const height = window.innerHeight;

camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
scene = new THREE.Scene();

const geometry = new THREE.PlaneGeometry(2, 2);

const uniforms = {
  uTime: { value: 0.0 },
  uMouse: { value: new THREE.Vector2(0.0, 0.0) }
};

const loader = new THREE.FileLoader();

Promise.all([
  fetch('shader.vert').then(res => res.text()),
  fetch('shader.frag').then(res => res.text())
]).then(([vertexShader, fragmentShader]) => {
  material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(width, height);

  animate();
});

function animate() {
  requestAnimationFrame(animate);
  uniforms.uTime.value += 0.01;
  renderer.render(scene, camera);
}

window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  uniforms.uMouse.value.set(mouse.x, mouse.y);
});
