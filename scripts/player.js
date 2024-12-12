export const player = {
    position: { x: 0, y: 0, z: 5 },
    moveForward() {
        this.position.z -= 0.1;
    },
    moveBackward() {
        this.position.z += 0.1;
    },
    moveLeft() {
        this.position.x -= 0.1;
    },
    moveRight() {
        this.position.x += 0.1;
    },
    rotateLeft() {
        this.position.y -= 0.05;
    },
    rotateRight() {
        this.position.y += 0.05;
    }
};


