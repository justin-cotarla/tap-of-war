const io = require('socket.io-client');
const AuroraAPI = require('nanoleaves');

let aurora;
let panels;
let socket;

let intervalIdA;
let intervalIdB;
let intervalIdLoop;

const initSockets = () => {
    
    socket = io(`${process.env.REACT_APP_IP}/middleman`);
    socket.on('connect', () => {
        console.log('Connected to server');
    })

    socket.on('set', data => {
        const config = data.map(({ r, g, b }, index) => ({
            id: panels[index],
            g,
            r,
            b,
        }));
        setPanels(config);
    })
    socket.on('start', () => {
        stop();
    })
    socket.on('stop', () => {
        animate();
    });
}

const initNanoLeaf = async () => {
    aurora = new AuroraAPI({
        host: '192.168.43.141',
        token: '9XE92jwz27H5rVjs9pRx5bYja9pR53qV',
    });

    const rawPanels = (await aurora.layout()).panels;

    panels = rawPanels
        .sort((a, b) => (a.x - b.x))
        
    panels = panels.map(({ id }) => id);
}

const setPanels = (config) => {
    aurora.setStaticPanel(config)
}

const animate = () => {
    let aIndex = 0;
    let bIndex = 0;

    let setA = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let setB = [0, 0, 0, 0, 0, 0, 0, 0, 0];


    intervalIdA = setInterval(() => {
        setA = new Array(setA.length).fill(0);
        setA[aIndex] = 1;
        aIndex = (aIndex + 1) % setA.length;
    }, 250);

    intervalIdB = setInterval(() => {
        setB = new Array(setB.length).fill(0);
        setB[bIndex] = 1;
        bIndex = (bIndex + 1) % setB.length;
    }, 200);

    intervalIdLoop = setInterval(() => {
        const config = panels.map((id, index) => ({
            id,
            g: 0,
            r: setA[index]*255,
            b: setB[index]*255,
        }));
        setPanels(config);
    }, 200);
}

const stop = () => {
    clearInterval(intervalIdA);
    clearInterval(intervalIdB);
    clearInterval(intervalIdLoop);
}

initSockets();
initNanoLeaf();
animate();