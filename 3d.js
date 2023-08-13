// 3d.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('architecture3D').appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1); // Dimensions of the cube
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 3;

const input = {
    x: 0,
    y: 0,
};

const updateInput = (event) => {
    if (event.touches) {
        input.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        input.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
    } else {
        input.x = (event.clientX / window.innerWidth) * 2 - 1;
        input.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
};

document.addEventListener('mousemove', updateInput);
document.addEventListener('touchmove', updateInput);

const resizeRendererToDisplaySize = () => {
    const canvas = renderer.domElement;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
};

const animate = () => {
    requestAnimationFrame(animate);

    resizeRendererToDisplaySize();

    cube.rotation.x = input.y * 0.5;
    cube.rotation.y = input.x * 1;

    renderer.render(scene, camera);
};

animate();
