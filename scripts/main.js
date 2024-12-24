import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { createCamera, updateCameraPosition, handleResize } from './map/camera.js';
import { createMap } from './map/map.js';
import { player } from './map/player.js';
import { castRay } from './map/raycasting.js';
import { handleMovementKeys, setUpKeyListeners, setUpMouseListeners, updateCameraBobbing } from './map/controls.js';

let scene, camera, renderer, raycaster, mouse, keys, CollideObjects = [];

function initializeScene() {
    // Initialize Scene
    scene = new THREE.Scene();
    camera = createCamera();
    
    // Initialize Renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-canvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional for softer shadows
    document.body.appendChild(renderer.domElement);
    
    // Add Lighting
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    // Create Map
    createMap(scene);

    // Initialize Raycaster and Mouse
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Set up Resize Listener
    handleResize(camera, renderer);

    // Set up Controls
    keys = setUpKeyListeners();
    setUpMouseListeners(camera);
}

function startAnimationLoop() {
    function animate() {
        requestAnimationFrame(animate);

        // Handle movement and camera updates
        handleMovementKeys(keys, player, camera);
        updateCameraPosition(camera, player);
        updateCameraBobbing(0.016, camera); // Fixed timestep; consider replacing with deltaTime if needed

        // Perform Raycasting
        const intersects = castRay(raycaster, scene, mouse, camera);
        if (intersects.length > 0) {
            // Handle intersections
        } else {
            scene.children.forEach(child => {
                // Reset material color if needed
            });
        }

        // Render the scene
        renderer.render(scene, camera);
    }

    animate();
}

// Call the functions to set up and start the scene
initializeScene();
startAnimationLoop();
