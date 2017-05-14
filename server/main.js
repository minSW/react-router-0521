import express from 'express';
import expressWs from 'express-ws';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session'; 
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import api from './routes';
import ws from './ws';

const app = express();
const port = 3200;
const devPort = 4200;
const wsInstant = expressWs(app);
const wsServer = wsInstant.getWss();
const wsClient = {};
wsServer.on('connection', (ws) => {
    let clientUrl = ws.upgradeReq.url.replace('.websocket','');
    if(wsClient.hasOwnProperty(clientUrl)){
      wsClient[clientUrl].push(ws);
    }else{
      wsClient[clientUrl] = [ws];
    }
    });

app.ws('*', (ws,req) => {
  ws.on('message', (msg) => {
    let senderUrl = ws.upgradeReq.url.replace('.websocket','');
    wsClient[senderUrl].forEach((client) => {
      client.send(msg);
      })
  })
});


/* use session */
app.use(session({
  secret: 'session_secret',
  resave: false,
  saveUninitialized: true
}));

app.use('/', express.static(path.join(__dirname, './../public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', api);
app.use('/ws', ws);

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}

app.listen(port, () => {
  console.log('Express is listening on port', port);
});
