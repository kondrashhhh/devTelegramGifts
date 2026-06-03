const cors_proxy = require('cors-anywhere');

const host = '0.0.0.0';
const port = 8080;

cors_proxy.createServer({
    originWhitelist: ['https://waffenstars.ru'],
    requireHeader: [],
    removeHeaders: ['cookie', 'cookie2'],
    setHeaders: {
        'Access-Control-Allow-Origin': 'https://waffenstars.ru',
        'Access-Control-Allow-Credentials': 'true'
    }
}).listen(port, host, () => {
    console.log(`CORS proxy running on ${host}:${port}`);
});