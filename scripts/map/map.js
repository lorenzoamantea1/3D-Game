import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

// Create a simple column with texture
function createColumn(x, y, z, radius, height, texture, scale = 1) {
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const column = new THREE.Mesh(geometry, material);
    column.position.set(x, y, z);
    column.castShadow = true;
    column.receiveShadow = true;
    column.scale.set(scale, scale, scale);  // Scale the column
    return column;
}

// Create a simple wall with texture
function createWall(x, y, z, width, height, depth, texture, scale = 1) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const wall = new THREE.Mesh(geometry, material);
    wall.position.set(x, y, z);
    wall.castShadow = true;
    wall.scale.set(scale, scale, scale);  // Scale the wall
    return wall;
}

// Create a simple floor with texture
function createFloor(texture, scale = 1) {
    const geometry = new THREE.PlaneGeometry(20, 20);
    const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;  // Ensure the floor is correctly rotated

    
    floor.receiveShadow = true;
    floor.scale.set(scale, scale, scale);  // Scale the floor
    return floor;
}

// Create a simple roof with texture
function createRoof(texture, scale = 1) {
    const geometry = new THREE.PlaneGeometry(20, 20);
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    const roof = new THREE.Mesh(geometry, material);
    roof.rotation.x = Math.PI / 2;
    roof.scale.set(scale, scale, scale);  // Scale the roof
    return roof;
}

// Create a simple map with walls, floor, roof, and columns
export function createMap(scene, renderer) {
    const textureLoader = new THREE.TextureLoader();

    // Load textures
    const floorTexture = textureLoader.load('assets/textures/floorTexture.jpg');
    const wallTexture = textureLoader.load('assets/textures/wallTexture.jpg');
    const roofTexture = textureLoader.load('assets/textures/floorTexture.jpg');
    const columnTexture = textureLoader.load('assets/textures/wallTexture.jpg');

    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    roofTexture.wrapS = roofTexture.wrapT = THREE.RepeatWrapping;
    columnTexture.wrapS = columnTexture.wrapT = THREE.RepeatWrapping;

    floorTexture.repeat.set(5, 5); 
    wallTexture.repeat.set(3, 1);
    roofTexture.repeat.set(5, 5); 
    columnTexture.repeat.set(2, 2);

    // Scaling factor
    const scale = 1; // Adjust this scale as needed

    // Floor
    const floor = createFloor(floorTexture, scale);
    scene.add(floor);

    // Walls
    const wallThickness = 1;
    const wallHeight = 5;
    const wallWidth = 20;
    const wallDepth = wallThickness;

    // Create walls
    const wall1 = createWall(0, wallHeight / 2, -10, wallWidth, wallHeight, wallDepth, wallTexture, scale); 
    const wall2 = createWall(0, wallHeight / 2, 10, wallWidth, wallHeight, wallDepth, wallTexture, scale); 
    const wall3 = createWall(-10, wallHeight / 2, 0, wallDepth, wallHeight, wallWidth, wallTexture, scale); 
    const wall4 = createWall(10, wallHeight / 2, 0, wallDepth, wallHeight, wallWidth, wallTexture, scale); 

    scene.add(wall1, wall2, wall3, wall4);
    
    // Roof
    const roof = createRoof(roofTexture, scale);
    roof.position.set(0, wallHeight, 0); 
    scene.add(roof);

    // Add columns at the center of the room
    const columnRadius = 0.5; 
    const columnHeight = 5; 
    
    // Create columns in the center of the room
    const column1 = createColumn(-5, columnHeight / 2, -5, columnRadius, columnHeight, columnTexture, scale); 
    const column2 = createColumn(5, columnHeight / 2, -5, columnRadius, columnHeight, columnTexture, scale); 
    const column3 = createColumn(-5, columnHeight / 2, 5, columnRadius, columnHeight, columnTexture, scale); 
    const column4 = createColumn(5, columnHeight / 2, 5, columnRadius, columnHeight, columnTexture, scale); 

    scene.add(column1, column2, column3, column4);

    // Lighting
    // Add ambient light with reduced intensity
    const ambientLight = new THREE.AmbientLight(0x404040, 0.45);  // Dim ambient light
    scene.add(ambientLight);

    // Add directional light with reduced intensity
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);  // Dimmed directional light
    directionalLight.position.set(5,3,5).normalize();
    directionalLight.castShadow = true; 
    scene.add(directionalLight);

    // Adjust light position to be above the objects
    directionalLight.position.set(5, 5, 5);  // Increase the height of the light
    
    // Adjust shadow properties for better results
    directionalLight.shadow.camera.near = 0.1;  // Near plane for shadow camera
    directionalLight.shadow.camera.far = 50;    // Far plane for shadow camera
    directionalLight.shadow.camera.left = -10;  // Left boundary of the camera frustum
    directionalLight.shadow.camera.right = 10;  // Right boundary of the camera frustum
    directionalLight.shadow.camera.top = 10;    // Top boundary of the camera frustum
    directionalLight.shadow.camera.bottom = -10;  // Bottom boundary of the camera frustum
    
    directionalLight.shadow.bias = -0.005;  // Small negative bias to prevent shadow artifacts

    // Ensure the light is pointing towards the center of the scene
    directionalLight.target.position.set(0,0,0);

    // Ensure objects cast and receive shadows
    floor.receiveShadow = true;
    column1.castShadow = true;
    column1.receiveShadow = true;
    column2.castShadow = true;
    column2.receiveShadow = true;
    column3.castShadow = true;
    column3.receiveShadow = true;
    column4.castShadow = true;
    column4.receiveShadow = true;

}
