require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

(async function () {
  const port = process.env.PORT || '9000';
  const ipfsNode = process.env.IPFS_NOD_ENDPOINT || 'http://127.0.0.1:5001';

  const app = express();

  app.use(cors());

  app.use(
    fileUpload({
      createParentPath: true,
    })
  );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // this endpoint handle upload JSON data
  app.post('/upload/json', async (request, response) => {
    if (request.body) {
      try {
        const { create } = await import('kubo-rpc-client');
        const client = create({ url: ipfsNode });

        const { cid } = await client.add(JSON.stringify(request.body));

        logger.info('handled upload request', {
          label: 'api',
          props: {
            path: request.path,
            remoteAddress: request.header('CF-Connecting-IP')
              ? request.header('CF-Connecting-IP')
              : `${request.socket.remoteFamily}:${request.socket.remoteAddress}`,
            cid: cid.toString(),
          },
        });
        response.status(200).json({
          error: null,
          cid: cid.toString(),
        });
      } catch (e) {
        logger.error('failed to handle upload request', {
          label: 'api',
          props: {
            path: request.path,
            remoteAddress: request.header('CF-Connecting-IP')
              ? request.header('CF-Connecting-IP')
              : `${request.socket.remoteFamily}:${request.socket.remoteAddress}`,
            error: e.message,
          },
        });
        response.status(500).json({ error: 'unexpected error' });
      }
    }
  });

  // this endpoint handles upload files
  app.post('/upload/file', async (request, response) => {
    if (request.files && request.files.file) {
      try {
        const { create } = await import('kubo-rpc-client');
        const client = create({ url: ipfsNode });

        const { cid } = await client.add(request.files.file.data);

        logger.info('handled upload request', {
          label: 'api',
          props: {
            path: request.path,
            remoteAddress: request.header('CF-Connecting-IP')
              ? request.header('CF-Connecting-IP')
              : `${request.socket.remoteFamily}:${request.socket.remoteAddress}`,
            cid: cid.toString(),
          },
        });

        response.status(200).json({
          error: null,
          cid: cid.toString(),
        });
      } catch (e) {
        logger.error('failed to handle upload request', {
          label: 'api',
          props: {
            path: request.path,
            remoteAddress: request.header('CF-Connecting-IP')
              ? request.header('CF-Connecting-IP')
              : `${request.socket.remoteFamily}:${request.socket.remoteAddress}`,
            error: e.message,
          },
        });
        response.status(500).json({ error: 'unexpected error' });
      }
    }
  });

  app.all('/', sayHello);

  app.listen(port, () => {
    logger.info('started api server', {
      label: 'api',
      props: {
        address: `0.0.0.0:${port}`,
      },
    });
  });
})();

async function sayHello(request, response) {
  response
    .status(200)
    .setHeader('Content-Type', 'text/plain; charset=utf-8')
    .send('Hello! Talk is cheap, show me data!')
    .end();
}
