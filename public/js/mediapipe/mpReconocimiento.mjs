
const mpHands = window;
const controls = window;
// Our input frames will come from here.
const videoElement = document.getElementsByClassName('input_video')[0];
const controlsElement = document.getElementsByClassName('control-panel')[0];
const config = { locateFile: (file) => { //esta wea llama al modelo de entrenamiento hand_landmarker.task
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mpHands.VERSION}/${file}`;
} };

const fpsControl = new controls.FPS();

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