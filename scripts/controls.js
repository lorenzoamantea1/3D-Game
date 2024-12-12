let isMouseDown = false;
let lastMouseX = 0;
let lastMouseY = 0;
let yaw = 0;
let pitch = 0;

export function handleMovementKeys(keys, player) {
    if (keys.W) player.moveForward();
    if (keys.S) player.moveBackward();
    if (keys.A) player.moveLeft();
    if (keys.D) player.moveRight();
    if (keys.ArrowLeft) player.rotateLeft();
    if (keys.ArrowRight) player.rotateRight();
}

export function setUpKeyListeners() {
    const keys = {
        W: false,
        S: false,
        A: false,
        D: false,
        ArrowLeft: false,
        ArrowRight: false,
    };

    window.addEventListener('keydown', (event) => {
        if (event.key === 'w' || event.key === 'W') keys.W = true;
        if (event.key === 's' || event.key === 'S') keys.S = true;
        if (event.key === 'a' || event.key === 'A') keys.A = true;
        if (event.key === 'd' || event.key === 'D') keys.D = true;
        if (event.key === 'ArrowLeft') keys.ArrowLeft = true;
        if (event.key === 'ArrowRight') keys.ArrowRight = true;
    });

    window.addEventListener('keyup', (event) => {
        if (event.key === 'w' || event.key === 'W') keys.W = false;
        if (event.key === 's' || event.key === 'S') keys.S = false;
        if (event.key === 'a' || event.key === 'A') keys.A = false;
        if (event.key === 'd' || event.key === 'D') keys.D = false;
        if (event.key === 'ArrowLeft') keys.ArrowLeft = false;
        if (event.key === 'ArrowRight') keys.ArrowRight = false;
    });

    return keys;
}

export function handleMouseMovement(event, camera) {
    if (!isMouseDown) return;

    const sensitivity = 0.002;

    const deltaX = event.clientX - lastMouseX;
    const deltaY = event.clientY - lastMouseY;

    yaw -= deltaX * sensitivity;
    pitch -= deltaY * sensitivity;

    pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

    camera.rotation.set(pitch, yaw, 0);

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
}

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
