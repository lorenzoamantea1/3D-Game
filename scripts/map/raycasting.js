export function castRay(raycaster, scene, mouse, camera) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    return intersects;
}
