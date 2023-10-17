import { obtenerNuevasCoordenadas } from '../mediapipe/mpReconocimiento.mjs';
const canvas = document.getElementById('output_canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

camera.position.z = 0.2;

const spheres = []; // Almacena las esferas

// Función para crear esferas en una ubicación específica
function createSphere(x, y, z) {
    const geometry = new THREE.SphereGeometry(0.008, 5, 5);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    scene.add(sphere);
    spheres.push(sphere);
}

// Función para eliminar todas las esferas de la escena
function clearSpheres() {
    for (const sphere of spheres) {
        scene.remove(sphere);
    }
    spheres.length = 0;
}

// Actualiza el tamaño del renderizador cuando cambie el tamaño del canvas


// Función para actualizar las esferas en tiempo real con nuevas coordenadas
function updateSpheres(newCoordinates) {
    // Borra las esferas existentes
    clearSpheres();
    // Crea esferas en las nuevas ubicaciones
    if (newCoordinates != null){
        for (let i = 0; i < newCoordinates.length; i++) {
            console.log(newCoordinates[i].x, newCoordinates[i].y, newCoordinates[i].z);
            createSphere(newCoordinates[i].x, -newCoordinates[i].y, -newCoordinates[i].z);
        }
    } 
}

// Supongamos que tienes un bucle o evento que actualiza constantemente las coordenadas.
// Debes llamar a updateSpheres con las nuevas coordenadas cuando estén disponibles.
setTimeout(() => {
    let landmarkAnterior = obtenerNuevasCoordenadas(); // Inicializa con el valor actual
    function updateLoop() {
        const newCoordinates = obtenerNuevasCoordenadas();
    
        if (landmarkAnterior !== newCoordinates) {
            updateSpheres(landmarkAnterior);
        }
    
        landmarkAnterior = newCoordinates; // Actualiza la variable con las nuevas coordenadas
        // Llama a esta función nuevamente para actualizar continuamente
        requestAnimationFrame(updateLoop);
        renderer.render(scene, camera, spheres);
    }
    // Comienza el bucle de actualización
    updateLoop();
}, 0);

