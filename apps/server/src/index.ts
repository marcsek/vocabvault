import type { Express } from 'express';
import express from 'express';

const app: Express = express();

app.listen(3001, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${3001}`);
});
