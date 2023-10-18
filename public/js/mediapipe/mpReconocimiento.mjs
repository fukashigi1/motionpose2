
const mpHands = window;
const controls = window;
// Our input frames will come from here.
const videoElement = document.getElementsByClassName('input_video')[0];
const controlsElement = document.getElementsByClassName('control-panel')[0];
const coordenadas = document.getElementById('coordenadas');

const config = { locateFile: (file) => { //esta wea llama al modelo de entrenamiento hand_landmarker.task
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mpHands.VERSION}/${file}`;
} };

const fpsControl = new controls.FPS();

function extractData(landmarks){
    //ESTA FUNCION TRANSFORMA LOS DATOS DE OBJETO A FLOATS, SE ALMACENA TODO EN LA LISTA
    //VALORES, LA CUAL CONTIENE 63 ELEMENTOS (X, Y ,Z * 3)

    const scaleFactor = 100; //Variable para ajustar la escala de las coordenadas
    var transformed = JSON.stringify(landmarks) //se transforma de objeto a string.
    //De aquí para abajo se quitan todos los caractere especiales como, {[":,.
    var output = transformed.replace(/[\[\]{}]/g, '');
    output = output.replace(/"|x|y|z|:/g, '');
    output = output.replace(/,/g, ' ');
    //Se separa el string con los 21 datos en una lista.
    var valores = output.split(' ')
    //Se trunca cada numero por 6 decimales, (dice 8 porque en realidad se está cortando un string)
    //Se transforma cada elemento de la lista (strings) en flotantes.
    valores = valores.map(function(elemento) {
      return parseFloat(elemento)
    });
    const valoresEscalados = valores.map((valor) => (valor * scaleFactor).toFixed(6)); //se escala por 100 y se corta en 6 decimales.
    const valoresPlanos = valoresEscalados.flat().map(Number);; //Transformamos todo a un array plano
    coordenadas.innerHTML = valoresPlanos //<-- Se muestra a tiempo real dentro del h1 en el html.
    console.log(valoresPlanos)
}

function onResults(results) {
    // Update the frame rate.
    fpsControl.tick();
    // Draw the overlays.
    if (results.multiHandWorldLandmarks.length > 0) {
        // We only get to call updateLandmarks once, so we need to cook the data to
        // fit. The landmarks just merge, but the connections need to be offset.
        //const landmarks = results.multiHandWorldLandmarks.reduce((prev, current) => [...prev, ...current], []);

        const colors = [];
        let connections = [];
        for (let loop = 0; loop < results.multiHandWorldLandmarks.length; ++loop) {
            const offset = loop * mpHands.HAND_CONNECTIONS.length;
            const offsetConnections = mpHands.HAND_CONNECTIONS.map((connection) => [connection[0] + offset, connection[1] + offset]);
            connections = connections.concat(offsetConnections);
            const classification = results.multiHandedness[loop];
            colors.push({
                list: offsetConnections.map((unused, i) => i + offset),
                color: classification.label,
            });
        }
        setLandmark(results.multiHandWorldLandmarks[0]);
        //extractData(landmarks)
        //grid.updateLandmarks(landmarks, connections, colors);
    }
}
let landmarkExportar;
function setLandmark(landmarks){
    landmarkExportar = landmarks;
}
setTimeout(() => {
    landmarkExportar = null
}, 0);
export function obtenerNuevasCoordenadas() {
    if (landmarkExportar !== undefined) {
        return landmarkExportar;
    } else {
        return [0,0,0];
    }
}
const hands = new mpHands.Hands(config);
hands.onResults(onResults);
new controls
    .ControlPanel(controlsElement, {
    selfieMode: true,
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.3,
    minTrackingConfidence: 0.5
})
    .add([
    new controls.StaticText({ title: 'Motion Pose' }),
    fpsControl,
    new controls.SourcePicker({
        onFrame: async (input, size) => {
            const aspect = size.height / size.width;
            let width, height;
            if (window.innerWidth > window.innerHeight) {
                height = window.innerHeight;
                width = height / aspect;
            }
            else {
                width = window.innerWidth;
                height = width * aspect;
            }
            await hands.send({ image: input });
        },
    }),
    new controls.Slider({
        title: 'Complejidad del modelo',
        field: 'modelComplexity',
        discrete: ['Minima', 'Completa'],
    }), 
    new controls.Slider({
        title: 'Confidencia de detección',
        field: 'minDetectionConfidence',
        range: [0, 1],
        step: 0.01
    }),
    new controls.Slider({
        title: 'Confidencia de seguimiento',
        field: 'minTrackingConfidence',
        range: [0, 1],
        step: 0.01
    }),
])
    .on(x => {
    const options = x;
    videoElement.classList.toggle('selfie', options.selfieMode);
    hands.setOptions(options);
});