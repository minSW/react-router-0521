import express from 'express';
import expressWs from 'express-ws';

const router = express.Router();
expressWs(router);

router.ws('/', (ws, req) => {
  ws.on('close', (msg) => {
    console.log("close");
  });
});

export default router;
