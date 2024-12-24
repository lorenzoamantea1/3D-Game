export const player = {
    position: { x: 0, y: 2, z: 5 },
    moveForward(direction, speed) {
        this.position.x += direction.x * speed;
        this.position.z += direction.z * speed;
    },
    moveBackward(direction, speed) {
        this.position.x -= direction.x * speed;
        this.position.z -= direction.z * speed;
    },
    moveLeft(right, speed) {
        this.position.x -= right.x * speed;
        this.position.z -= right.z * speed;
    },
    moveRight(right, speed) {
        this.position.x += right.x * speed;
        this.position.z += right.z * speed;
    },
    rotateLeft() {
        this.position.y -= 0.05;
    },
    rotateRight() {
        this.position.y += 0.05;
    }
};