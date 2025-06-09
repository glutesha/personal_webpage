import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

var container = document.getElementById('glutesha');

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, 1, 0.1, 1000 );
const light = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );

scene.add( light );

light.position.z = 3;
light.position.y = 3;
light.position.x = 0;
light.intensity = 2;

camera.position.x = 0;
camera.position.z = 2.5;
camera.position.y = 0;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor( 0xffffff, 0);
container.appendChild( renderer.domElement );

const target = new THREE.Object3D();
const intersectionPoint = new THREE.Vector3();
const planeNormal = new THREE.Vector3();
const plane = new THREE.Plane();
const mouseposition = new THREE.Vector2();  
const raycaster = new THREE.Raycaster();

let head; 
let gluten;

intersectionPoint.z = camera.position.z + 5;

loader.load('../gluten.glb', function( glb ) {
    gluten = glb.scene;
    scene.add( gluten );

    const box = new THREE.Box3().setFromObject( gluten );
    const center = box.getCenter( new THREE.Vector3() );
    
    gluten.position.x += ( gluten.position.x - center.x );
    gluten.position.y += ( gluten.position.y - center.y );
    gluten.position.z += ( gluten.position.z - center.z );
    
    head = gluten.getObjectByName('Bone003');
});

target.position.z = camera.position.z;
target.position.y = camera.position.y;

var mouseX = 0;
var mouseY = 0;

window.addEventListener('mousemove', (event) => {
    const rect = container.getBoundingClientRect();

    if (event.clientX < rect.right && event.clientX > rect.left) {
        mouseX = event.clientX;
    }
    else if (event.clientX < rect.left && event.clientX < rect.right) {
        mouseX = rect.left;
    }
    else {
        mouseX = rect.right;
    }

    if (event.clientY < rect.bottom - 45) {
        mouseY = event.clientY;
    }
    else{
        mouseY = rect.bottom - 45;
    }


    mousetolook(mouseX, mouseY);
});


function mousetolook(X, Y) {
    const rect = container.getBoundingClientRect();
    mouseposition.x = ((X - rect.left) / rect.width) * 2 - 1;
    mouseposition.y = -((Y - rect.top) / rect.height) * 2 + 1;
    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, gluten.position);
    raycaster.setFromCamera(mouseposition, camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);
    intersectionPoint.z = camera.position.z;
}

function resizeRendererToContainer() {
    const rect = container.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height); 
    renderer.setSize(size, size);
  }

resizeRendererToContainer();

window.addEventListener('resize', resizeRendererToContainer);

function animate() {
    target.position.lerp(intersectionPoint, 0.1); 

    if (head) { 
        head.lookAt(target.position);
    }

	renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );
