import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { player } from './player.js';

export function createCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    player.position.y = 2;
    camera.position.set(player.position.x, player.position.y, player.position.z); 
    return camera;
}

export function updateCameraPosition(camera, player) {
    camera.position.set(player.position.x, player.position.y, player.position.z);
}

export function handleResize(camera, renderer) {
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
