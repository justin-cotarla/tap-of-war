import Hapi from 'hapi';

const startServer = async () => {

    const server = new Hapi.Server({ port: 3000, host: 'backend' });
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.response('Hello');
        },
    });

    await server.start();

    console.log(`Server running at: ${server.info.uri}`);
};

startServer();
