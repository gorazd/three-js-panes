/**
 * Interactive 3D Grid with Three.js
 * Creates a responsive grid of planes that react to mouse movement
 */

// Import required Three.js modules
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Setup basic Three.js scene, camera, and renderer
const scene = new THREE.Scene();
// Set up perspective camera with 75° FOV
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Initialize WebGL renderer with antialiasing for smooth edges
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Mouse tracking system
// Stores normalized device coordinates (-1 to +1)
const mouse = new THREE.Vector2();
// Stores world space coordinates for mouse position
const mouseWorld = new THREE.Vector3();

// Convert mouse screen coordinates to normalized device coordinates
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Create base geometry and material for planes
const geometry = new THREE.PlaneGeometry( 1, 2 );
const material = new THREE.MeshBasicMaterial( { color: 0xffccee, side: THREE.DoubleSide } );

// Grid configuration
const rows = 24;
const cols = 29;
const gap = .5;  // Space between planes
const planes = [];  // Store all plane references

// Generate grid of planes
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const plane = new THREE.Mesh(geometry, material);
        plane.position.x = j * (1 + gap) - (cols * (1 + gap) - gap) / 2;
        plane.position.y = i * (2 + gap) - (rows * (2 + gap) - gap) / 2;
        planes.push(plane);
        scene.add(plane);
    }
}

// Position camera to view entire grid
camera.position.z = 12;

/**
 * Animation loop
 * Updates plane rotations based on mouse position
 */
function animate() {
    // Convert mouse position to world coordinates
    mouseWorld.set(mouse.x, mouse.y, 0);
    mouseWorld.unproject(camera);
    mouseWorld.sub(camera.position).normalize();
    
    // Calculate z-plane intersection
    const distance = -camera.position.z / mouseWorld.z;
    mouseWorld.multiplyScalar(distance).add(camera.position);

    // Update each plane's rotation
    planes.forEach(plane => {
        // Initialize target rotation if not exists
        if (!plane.userData.targetRotation) {
            plane.userData.targetRotation = { x: 0, y: 0 };
        }
        
        // Calculate rotation angles based on distance from mouse
        plane.userData.targetRotation.x = (plane.position.y - mouseWorld.y) * 0.2;
        plane.userData.targetRotation.y = (mouseWorld.x - plane.position.x) * 0.2;
        
        // Smoothly interpolate current rotation to target rotation
        plane.rotation.x += (plane.userData.targetRotation.x - plane.rotation.x) * 0.1;
        plane.rotation.y += (plane.userData.targetRotation.y - plane.rotation.y) * 0.1;
    });

    renderer.render(scene, camera);
}

// Start animation loop
renderer.setAnimationLoop(animate);