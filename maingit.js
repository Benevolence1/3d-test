import * as THREE from "three";
import { OrbitControls } from "./utils/OrbitControls.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 1, 3);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
scene.add(new THREE.AmbientLight('#f9eaff', 2.5));

const directionalLight = new THREE.DirectionalLight('#fff8ef', 2.5);
directionalLight.position.set(5, 50, 9);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight('#cfa66b', 1.5);
directionalLight2.position.set(-5, -50, -9);
scene.add(directionalLight2);

// GLB Loader
const loader = new GLTFLoader();
loader.load(
    'cakeworld.glb',   // ← CHANGE THIS IF YOUR FILE IS IN A FOLDER
    (gltf) => {
        scene.add(gltf.scene);
    },
    undefined,
    (error) => {
        console.error('Error loading GLB:', error);
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
