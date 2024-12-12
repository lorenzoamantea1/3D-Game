import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { createCamera, updateCameraPosition, handleResize } from './camera.js';
import { createMap } from './map.js';
import { player } from './player.js';
import { castRay } from './raycasting.js';
import { handleMovementKeys, setUpKeyListeners } from './controls.js';
import { setUpMouseListeners } from './controls.js'; 

const scene = new THREE.Scene();
const camera = createCamera();

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

createMap(scene);

/*----------- Raycaster -----------*/
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});


handleResize(camera, renderer);

const keys = setUpKeyListeners();

setUpMouseListeners(camera);

function animate() {
    requestAnimationFrame(animate);
    handleMovementKeys(keys, player);

    updateCameraPosition(camera, player); 

    const intersects = castRay(raycaster, scene, mouse, camera);
    if (intersects.length > 0) {
        //intersects[0].object.material.color.set(0xff0000); 
    } else {
        scene.children.forEach(child => {
            //if (child.material) child.material.color.set(0x808080); 
        });
    }

    renderer.render(scene, camera);
}

animate();
