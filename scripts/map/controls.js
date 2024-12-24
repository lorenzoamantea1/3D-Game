import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

let isMouseDown = false;
let lastMouseX = 0;
let lastMouseY = 0;
let yaw = 0;
let pitch = 0;
let isMoving = false; // Flag to check if the player is moving
let walkSpeed = 0.05;  // Speed of movement
let bobbingAmplitude = 0.05;  // Amplitude of camera bobbing
let bobbingFrequency = 25; // Frequency of bobbing movement
let bobbingOffset = 0; // The offset used for bobbing

// To hold and update key states
export function setUpKeyListeners() {
    const keys = {
        W: false,
        S: false,
        A: false,
        D: false,
        ArrowLeft: false,
        ArrowRight: false,
        Shift: false,
    };

    window.addEventListener('keydown', (event) => {
        if (event.key === 'w' || event.key === 'W') keys.W = true;
        if (event.key === 's' || event.key === 'S') keys.S = true;
        if (event.key === 'a' || event.key === 'A') keys.A = true;
        if (event.key === 'd' || event.key === 'D') keys.D = true;
        if (event.key === 'ArrowLeft') keys.ArrowLeft = true;
        if (event.key === 'ArrowRight') keys.ArrowRight = true;
        if (event.key === 'Shift') keys.Shift = true; 
    });

    window.addEventListener('keyup', (event) => {
        if (event.key === 'w' || event.key === 'W') keys.W = false;
        if (event.key === 's' || event.key === 'S') keys.S = false;
        if (event.key === 'a' || event.key === 'A') keys.A = false;
        if (event.key === 'd' || event.key === 'D') keys.D = false;
        if (event.key === 'ArrowLeft') keys.ArrowLeft = false;
        if (event.key === 'ArrowRight') keys.ArrowRight = false;
        if (event.key === 'Shift') keys.Shift = false;
    });

    return keys;
}

// Handle player movement based on keys
export function handleMovementKeys(keys, player, camera) {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction); 

    const right = new THREE.Vector3();
    camera.getWorldDirection(right);
    right.cross(new THREE.Vector3(0, 1, 0)); 

    // Check if any movement keys are pressed
    isMoving = false;

    if (keys.W) {
        player.moveForward(direction, walkSpeed);
        isMoving = true;
    }
    if (keys.S) {
        player.moveBackward(direction, walkSpeed);
        isMoving = true;
    }
    if (keys.A) {
        player.moveLeft(right, walkSpeed);
        isMoving = true;
    }
    if (keys.D) {
        player.moveRight(right, walkSpeed);
        isMoving = true;
    }

    // Adjust walking speed or bobbing amplitude if Shift key is held down (running)
    if (keys.Shift) {
        walkSpeed = 0.15;  // Run faster
        bobbingAmplitude = 0.20 // More pronounced bobbing
    } else {
        walkSpeed = 0.05;  // Normal walking speed
        bobbingAmplitude = 0.1;  // Normal walking amplitude
    }
}

// Camera bobbing effect to simulate walking
export function updateCameraBobbing(delta, camera) {
    if (isMoving) {
        // Increase the offset as time progresses
        bobbingOffset += bobbingFrequency * delta;

        // Apply simple sine function for bobbing up and down
        const bobbingHeight = Math.sin(bobbingOffset) * bobbingAmplitude;

        // Adjust camera Y position to simulate walking up and down
        camera.position.y = 2 + bobbingHeight; // 2 is the default height above the ground
    } else {
        // Reset camera's Y position when not moving
        camera.position.y = 2;
    }

}

// Handle mouse movement for camera rotation
export function handleMouseMovement(event, camera) {
    if (!isMouseDown) return;

    const sensitivity = 0.002;
    const deltaX = event.clientX - lastMouseX;
    yaw -= deltaX * sensitivity;

    camera.rotation.set(pitch, yaw, 0); 

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
}

// Set up mouse listeners for camera control
export function setUpMouseListeners(camera) {
    window.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    });

    window.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    window.addEventListener('mousemove', (event) => {
        handleMouseMovement(event, camera);
    });
}