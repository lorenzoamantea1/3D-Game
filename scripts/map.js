import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

export function createWall(x, y, z) {
    const geometry = new THREE.BoxGeometry(1, 5, 1); 
    const material = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const wall = new THREE.Mesh(geometry, material);
    wall.position.set(x, y, z); 
    return wall;
}

export function createMap(scene) {
    const mapWidth = 20;  // Width of the map
    const mapHeight = 20; // Height of the map

    const floorGeometry = new THREE.PlaneGeometry(mapWidth, mapHeight);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;  
    floor.position.y = 0;  
    scene.add(floor);

    const pattern = [
        '11111111111111111111',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '10000000000000000001',
        '11111111111111111111',
    ];

    for (let x = -Math.floor(mapWidth / 2); x < Math.floor(mapWidth / 2); x++) {
        for (let z = -Math.floor(mapHeight / 2); z < Math.floor(mapHeight / 2); z++) {
            const patternX = x + Math.floor(mapWidth / 2); 
            const patternZ = z + Math.floor(mapHeight / 2);  

            if (pattern[patternZ] && pattern[patternZ][patternX] === '1') {
                const wall = createWall(x, 2, z);  
                scene.add(wall);
            }
        }
    }
}
