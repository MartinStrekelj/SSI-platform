import * as express from 'express';
import { default as Api } from './app';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', Api);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

export default app;
